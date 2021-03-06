package eeui.android.amap.component;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps.AMap;
import com.amap.api.maps.AMapOptions;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.LocationSource;
import com.amap.api.maps.MapsInitializer;
import com.amap.api.maps.TextureMapView;
import com.amap.api.maps.UiSettings;
import com.amap.api.maps.model.CameraPosition;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Marker;
import com.amap.api.maps.model.MyLocationStyle;
import com.amap.api.maps.model.VisibleRegion;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.ui.action.BasicComponentData;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.ui.view.WXFrameLayout;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.atomic.AtomicBoolean;

import eeui.android.amap.util.Constant;

public class WXMapViewComponent extends WXVContainer<FrameLayout> implements LocationSource,
    AMapLocationListener {
  private static final String TAG = "WXMapViewComponent";
  private static final int REQUEST_CODE_MAPVIEW = 0xA;
  private static String[] permissions = new String[]{
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"
  };
  private TextureMapView mMapView;
  private AMap mAMap;
  private UiSettings mUiSettings;
  private Activity mActivity;

  private boolean isScaleEnable = true;
  private boolean isZoomEnable = true;
  private boolean isCompassEnable = true;
  private boolean isMyLocationEnable = false;
  private float mZoomLevel;
  private int mGesture = 0xF;
  private boolean isIndoorSwitchEnable = false;
  private OnLocationChangedListener mLocationChangedListener;
  private AMapLocationClient mLocationClient;
  private AMapLocationClientOption mLocationOption;
  private HashMap<String, WXMapInfoWindowComponent> mInfoWindowHashMap = new HashMap<>();
  private AtomicBoolean isMapLoaded = new AtomicBoolean(false);
  private AtomicBoolean isInited = new AtomicBoolean(false);
  private Queue<MapOperationTask> paddingTasks = new LinkedList<>();
  private FrameLayout mapContainer;
  private int fakeBackgroundColor = Color.rgb(242, 238, 232);

  public WXMapViewComponent(WXSDKInstance instance, WXVContainer parent, BasicComponentData basicComponentData) {
    super(instance, parent, basicComponentData);
  }

  @Override
  protected FrameLayout initComponentHostView(@NonNull Context context) {
    mapContainer = new FrameLayout(context);
    mapContainer.setBackgroundColor(fakeBackgroundColor);
    if (context instanceof Activity) {
      mActivity = (Activity) context;
    }
    return mapContainer;
  }

  @Override
  protected void setHostLayoutParams(FrameLayout host, int width, int height, int left, int right, int top, int bottom) {
    super.setHostLayoutParams(host, width, height, left, right, top, bottom);
    if (!isMapLoaded.get() && !isInited.get()) {
      isInited.set(true);
      mapContainer.postDelayed(new Runnable() {
        @Override
        public void run() {
          mMapView = new TextureMapView(getContext());
          mapContainer.addView(mMapView, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
              ViewGroup.LayoutParams.MATCH_PARENT));
          WXLogUtils.e(TAG, "Create MapView " + mMapView.toString());
          initMap();
        }
      }, 0);
    }
  }

  private void initMap() {
    mMapView.onCreate(null);
    isMapLoaded.set(false);
    if (mAMap == null) {
      mAMap = mMapView.getMap();

      mAMap.setInfoWindowAdapter(new InfoWindowAdapter(this));
      mAMap.setOnMapLoadedListener(new AMap.OnMapLoadedListener() {
        @Override
        public void onMapLoaded() {
          WXLogUtils.e(TAG, "Map loaded");
          isMapLoaded.set(true);
          mZoomLevel = mAMap.getCameraPosition().zoom;
          mMapView.postDelayed(new Runnable() {
            @Override
            public void run() {
              execPaddingTasks();
            }
          }, 16);
        }
      });

      // ?????? Marker ???????????????
      mAMap.setOnMarkerClickListener(new AMap.OnMarkerClickListener() {
        // marker ?????????????????????????????????
        // ?????? true ?????????????????????????????????????????????false
        @Override
        public boolean onMarkerClick(Marker marker) {

          if (marker != null) {
            for (int i = 0; i < getChildCount(); i++) {
              if (getChild(i) instanceof WXMapMarkerComponent) {
                WXMapMarkerComponent child = (WXMapMarkerComponent) getChild(i);
                if (child.getMarker() != null && child.getMarker().getId() == marker.getId()) {
                  child.onClick();
                }
              }
            }
          }
          return false;
        }
      });
      mAMap.setOnCameraChangeListener(new AMap.OnCameraChangeListener() {

        private boolean mZoomChanged;

        @Override
        public void onCameraChange(CameraPosition cameraPosition) {
          mZoomChanged = mZoomLevel != cameraPosition.zoom;
          mZoomLevel = cameraPosition.zoom;
        }

        @Override
        public void onCameraChangeFinish(CameraPosition cameraPosition) {
          if (mZoomChanged) {

            float scale = mAMap.getScalePerPixel();
            float scaleInWeex = scale / WXViewUtils.getWeexPxByReal(scale);

            VisibleRegion visibleRegion = mAMap.getProjection().getVisibleRegion();
            WXLogUtils.d(TAG, "Visible region: " + visibleRegion.toString());
            Map<String, Object> region = new HashMap<>();
            region.put("northeast", convertLatLng(visibleRegion.latLngBounds.northeast));
            region.put("southwest", convertLatLng(visibleRegion.latLngBounds.southwest));

            Map<String, Object> data = new HashMap<>();
            data.put("targetCoordinate", cameraPosition.target.toString());
            data.put("zoom", cameraPosition.zoom);
            data.put("tilt", cameraPosition.tilt);
            data.put("bearing", cameraPosition.bearing);
            data.put("isAbroad", cameraPosition.isAbroad);
            data.put("scalePerPixel", scaleInWeex);
            data.put("visibleRegion", region);
            getInstance().fireEvent(getRef(), Constant.EVENT.ZOOM_CHANGE, data);
          }
        }
      });

      mAMap.setOnMapTouchListener(new AMap.OnMapTouchListener() {
        boolean dragged = false;

        @Override
        public void onTouch(MotionEvent motionEvent) {

          switch (motionEvent.getAction()) {
            case MotionEvent.ACTION_MOVE:
              dragged = true;
              break;
            case MotionEvent.ACTION_UP:
              if (dragged) getInstance().fireEvent(getRef(), Constant.EVENT.DRAG_CHANGE);
              dragged = false;
              break;
          }
        }
      });
      setUpMap();
    }
  }

  private void setUpMap() {
    mUiSettings = mAMap.getUiSettings();

    mUiSettings.setScaleControlsEnabled(isScaleEnable);
    mUiSettings.setZoomControlsEnabled(isZoomEnable);
    mUiSettings.setCompassEnabled(isCompassEnable);
    mUiSettings.setIndoorSwitchEnabled(isIndoorSwitchEnable);
    if (checkPermissions(mActivity, permissions)) {
      setMyLocationStatus(isMyLocationEnable);
    }
    updateGestureSetting();

  }

  private void updateGestureSetting() {
    if ((mGesture & 0xF) == 0xF) {
      mUiSettings.setAllGesturesEnabled(true);
    } else {
      if ((mGesture & Constant.Value.SCROLLGESTURE) == Constant.Value.SCROLLGESTURE) {
        mUiSettings.setScrollGesturesEnabled(true);
      } else {
        mUiSettings.setScrollGesturesEnabled(false);
      }

      if ((mGesture & Constant.Value.ZOOMGESTURE) == Constant.Value.ZOOMGESTURE) {
        mUiSettings.setZoomGesturesEnabled(true);
      } else {
        mUiSettings.setZoomGesturesEnabled(false);
      }

      if ((mGesture & Constant.Value.TILTGESTURE) == Constant.Value.TILTGESTURE) {
        mUiSettings.setTiltGesturesEnabled(true);
      } else {
        mUiSettings.setTiltGesturesEnabled(false);
      }

      if ((mGesture & Constant.Value.ROTATEGESTURE) == Constant.Value.ROTATEGESTURE) {
        mUiSettings.setRotateGesturesEnabled(true);
      } else {
        mUiSettings.setRotateGesturesEnabled(false);
      }
    }
    WXLogUtils.e(TAG, "init map end ");
  }

  @JSMethod
  public void setMyLocationButtonEnabled(boolean enabled) {

    if (mUiSettings != null) {
      mUiSettings.setMyLocationButtonEnabled(enabled);
    }
  }

  @Override
  public void onActivityCreate() {
    super.onActivityCreate();
    WXLogUtils.e(TAG, "onActivityCreate");
  }

  @Override
  public void onActivityPause() {
    if (mMapView != null) {
      mMapView.onPause();
      deactivate();
    }
    WXLogUtils.e(TAG, "onActivityPause");
  }

  @Override
  public void onActivityResume() {
    if (mMapView != null) {
      mMapView.onResume();
    }
    WXLogUtils.e(TAG, "onActivityResume");
  }

  private boolean requestPermissions() {
    boolean granted = true;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      granted = false;
      if (mActivity != null) {
        if (!checkPermissions(mActivity, permissions)) {
          ActivityCompat.requestPermissions(mActivity, permissions, REQUEST_CODE_MAPVIEW);
        } else {
          granted = true;
        }
      }
    }
    return granted;
  }

  @Override
  public void onActivityDestroy() {
    if (mMapView != null) {
      mMapView.onDestroy();
    }
    if (mLocationClient != null) {
      mLocationClient.onDestroy();
    }
    WXLogUtils.e(TAG, "onActivityDestroy");
  }

  @WXComponentProp(name = Constant.Name.KEYS)
  public void setApiKey(String keys) {
    try {
      JSONObject object = new JSONObject(keys);
      String key = object.optString("android");
      if (!TextUtils.isEmpty(key)) {
        MapsInitializer.setApiKey(key);
        AMapLocationClient.setApiKey(key);
        //ServiceSettings.getInstance().setApiKey(key);
        WXLogUtils.d(TAG, "Set API key success");
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }

  }

  @WXComponentProp(name = Constant.Name.SCALECONTROL)
  public void setScaleEnable(final boolean scaleEnable) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        isScaleEnable = scaleEnable;
        mUiSettings.setScaleControlsEnabled(scaleEnable);
      }
    });
  }

  @WXComponentProp(name = Constant.Name.ZOOM_ENABLE)
  public void setZoomEnable(final boolean zoomEnable) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        isZoomEnable = zoomEnable;
        mUiSettings.setZoomControlsEnabled(zoomEnable);
      }
    });
  }

  @WXComponentProp(name = Constant.Name.ZOOM)
  public void setZoom(final int level) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        mAMap.moveCamera(CameraUpdateFactory.zoomTo(level));
      }
    });
  }

  @WXComponentProp(name = Constant.Name.COMPASS)
  public void setCompass(final boolean compass) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        isCompassEnable = compass;
        mUiSettings.setCompassEnabled(compass);
      }
    });
  }

  @WXComponentProp(name = Constant.Name.GEOLOCATION)
  public void setMyLocationEnable(final boolean myLocationEnable) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        isMyLocationEnable = myLocationEnable;
        if (requestPermissions()) {
          setMyLocationStatus(myLocationEnable);
        }
      }
    });
  }

  @WXComponentProp(name = Constant.Name.ZOOM_POSITION)
  public void setZoomPosition(final String position) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        if (mUiSettings != null) {
          if (Constant.Value.RIGHT_BOTTOM.equalsIgnoreCase(position)) {
            mUiSettings.setZoomPosition(AMapOptions.ZOOM_POSITION_RIGHT_BUTTOM);
          } else if (Constant.Value.RIGHT_CENTER.equalsIgnoreCase(position)) {
            mUiSettings.setZoomPosition(AMapOptions.ZOOM_POSITION_RIGHT_CENTER);
          } else {
            WXLogUtils.e(TAG, "Illegal zoom position value: " + position);
          }
        }
      }
    });
  }

  @Override
  public void addSubView(View child, int index) {

  }

  @WXComponentProp(name = Constant.Name.CENTER)
  public void setCenter(final String location) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        try {
          JSONArray jsonArray = new JSONArray(location);
          LatLng latLng = new LatLng(jsonArray.optDouble(1), jsonArray.optDouble(0));
          mAMap.moveCamera(CameraUpdateFactory.changeLatLng(latLng));
        } catch (JSONException e) {
          e.printStackTrace();
        }
      }
    });
  }

  @WXComponentProp(name = Constant.Name.GESTURE)
  @Deprecated
  public void setGesture(final int gesture) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        mGesture = gesture;
        updateGestureSetting();
      }
    });
  }

  @WXComponentProp(name = Constant.Name.GESTURES)
  public void setGestures(final String gestures) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        try {
          WXLogUtils.d(TAG, "setGestures: " + gestures);
          JSONArray array = new JSONArray(gestures);
          mUiSettings.setAllGesturesEnabled(false);
          for (int i = 0; i < array.length(); i++) {
            String gesture = array.getString(i);
            if ("zoom".equalsIgnoreCase(gesture)) {
              mUiSettings.setZoomGesturesEnabled(true);
            } else if ("rotate".equalsIgnoreCase(gesture)) {
              mUiSettings.setRotateGesturesEnabled(true);
            } else if ("tilt".equalsIgnoreCase(gesture)) {
              mUiSettings.setTiltGesturesEnabled(true);
            } else if ("scroll".equalsIgnoreCase(gesture)) {
              mUiSettings.setScrollGesturesEnabled(true);
            } else {
              WXLogUtils.w(TAG, "Wrong gesture: " + gesture);
            }
          }
        } catch (JSONException e) {
          e.printStackTrace();
        }
      }
    });
  }

  @WXComponentProp(name = Constant.Name.MY_LOCATION_ENABLED)
  public void setMyLocationEnabled(final boolean enabled) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        WXLogUtils.d(TAG, "setMyLocationButtonEnabled: " + enabled);
        mUiSettings.setMyLocationButtonEnabled(enabled);
      }
    });
  }

  @WXComponentProp(name = Constant.Name.SHOW_MY_LOCATION)
  public void setShowMyLocation(final boolean show) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        WXLogUtils.d(TAG, "setShowMyLocation: " + show);
        MyLocationStyle style = mAMap.getMyLocationStyle();
        if (style == null) {
          style = new MyLocationStyle();
        }
        style.showMyLocation(show);
        mAMap.setMyLocationStyle(style);
      }
    });
  }

  @WXComponentProp(name = Constant.Name.CUSTOM_ENABLED)
  public void setCustomEnabled(final boolean enabled) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        WXLogUtils.d(TAG, "setMapCustomEnable: " + enabled);
        mAMap.setMapCustomEnable(true);
      }
    });
  }

  @WXComponentProp(name = Constant.Name.CUSTOM_STYLE_PATH)
  public void setCustomStylePath(final String pathObject) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        try {
          JSONObject object = new JSONObject(pathObject);
          String path = object.optString("android");
          if (!TextUtils.isEmpty(path)) {
            WXLogUtils.d(TAG, "setCustomMapStylePath: " + path);
            mAMap.setCustomMapStylePath(path);
            mAMap.setMapCustomEnable(true);
          }
        } catch (JSONException e) {
          e.printStackTrace();
        }
      }
    });
  }

  @WXComponentProp(name = Constant.Name.INDOORSWITCH)
  public void setIndoorSwitchEnable(final boolean indoorSwitchEnable) {
    postTask(new MapOperationTask() {
      @Override
      public void execute(TextureMapView mapView) {
        isIndoorSwitchEnable = indoorSwitchEnable;
        mUiSettings.setIndoorSwitchEnabled(indoorSwitchEnable);
      }
    });
  }

  public void setMyLocationStatus(boolean isActive) {

    if (isActive) {
      mAMap.setLocationSource(this);// ??????????????????
      mUiSettings.setMyLocationButtonEnabled(true && checkPermissions(mActivity, permissions));// ????????????????????????????????????
      mAMap.setMyLocationEnabled(true);// ?????????true??????????????????????????????????????????false??????????????????????????????????????????????????????false
      // ???????????????????????????????????? ??????????????????????????????????????????????????????????????????
      mAMap.setMyLocationType(AMap.LOCATION_TYPE_LOCATE);
    } else {
      deactivate();
      mAMap.setLocationSource(null);
      mAMap.setMyLocationEnabled(false);
      mUiSettings.setMyLocationButtonEnabled(false);
    }
  }

  @Override
  public void activate(OnLocationChangedListener listener) {
    mLocationChangedListener = listener;
    if (mLocationClient == null) {
      mLocationClient = new AMapLocationClient(getContext());
      mLocationOption = new AMapLocationClientOption();
      //??????????????????
      mLocationClient.setLocationListener(this);
      //??????????????????????????????
      mLocationOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
      //??????????????????
      mLocationClient.setLocationOption(mLocationOption);
      // ????????????????????????????????????????????????????????????????????????????????????????????????????????????
      // ??????????????????????????????????????????????????????????????????2000ms?????????????????????????????????stopLocation()???????????????????????????
      // ???????????????????????????????????????????????????onDestroy()??????
      // ?????????????????????????????????????????????????????????????????????stopLocation()???????????????????????????sdk???????????????
      mLocationClient.startLocation();
    }
  }

  @Override
  public void deactivate() {
    mLocationChangedListener = null;
    if (mLocationClient != null) {
      mLocationClient.stopLocation();
      mLocationClient.onDestroy();
    }
    mLocationClient = null;
  }

  @Override
  public void onLocationChanged(AMapLocation amapLocation) {
    if (mLocationChangedListener != null && amapLocation != null) {
      if (amapLocation != null && amapLocation.getErrorCode() == 0) {
        mLocationChangedListener.onLocationChanged(amapLocation);// ?????????????????????
      } else {
        String errText = "????????????," + amapLocation.getErrorCode() + ": " + amapLocation.getErrorInfo();
        WXLogUtils.e("AmapErr", errText);
      }
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    switch (requestCode) {
      case REQUEST_CODE_MAPVIEW:
        if (checkPermissions(mActivity, permissions) && isMyLocationEnable) {
          setMyLocationEnable(isMyLocationEnable);
        }
        break;
      default:
        break;
    }
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }

  public boolean checkPermissions(Activity context, String[] permissions) {
    boolean granted = true;
    if (permissions != null && permissions.length > 0) {
      for (String permission : permissions) {
        if (ContextCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
          granted = false;
          if (ActivityCompat.shouldShowRequestPermissionRationale(context, permission)) {
            Toast.makeText(context, "please give me the permissions", Toast.LENGTH_SHORT).show();
          }
        }
      }
    }

    return granted;
  }

  public HashMap<String, WXMapInfoWindowComponent> getCachedInfoWindow() {
    return mInfoWindowHashMap;
  }

  private void execPaddingTasks() {
    while (!paddingTasks.isEmpty()) {
      MapOperationTask task = paddingTasks.poll();
      if (task != null && mMapView != null) {
        WXLogUtils.d(TAG, "Exec padding task " + task.toString());
        task.execute(mMapView);
      }
    }
  }

  public void postTask(MapOperationTask task) {
    if (mMapView != null && isMapLoaded.get()) {
      WXLogUtils.d(TAG, "Exec task " + task.toString());
      task.execute(mMapView);
    } else {
      WXLogUtils.d(TAG, "Padding task " + task.toString());
      paddingTasks.offer(task);
    }
  }

  private static class InfoWindowAdapter implements AMap.InfoWindowAdapter {

    private WXMapViewComponent mWXMapViewComponent;

    InfoWindowAdapter(WXMapViewComponent wxMapViewComponent) {
      mWXMapViewComponent = wxMapViewComponent;
    }

    @Override
    public View getInfoWindow(Marker marker) {
      return render(marker);
    }

    @Override
    public View getInfoContents(Marker marker) {
      return render(marker);
    }

    private View render(Marker marker) {
      WXMapInfoWindowComponent wxMapInfoWindowComponent = mWXMapViewComponent.mInfoWindowHashMap.get(marker.getId());
      if (wxMapInfoWindowComponent != null) {
        WXFrameLayout host = wxMapInfoWindowComponent.getHostView();
        host.getLayoutParams().width = ViewGroup.LayoutParams.WRAP_CONTENT;
        host.getLayoutParams().height = ViewGroup.LayoutParams.WRAP_CONTENT;
        WXLogUtils.d(TAG, "Info size: " + host.getMeasuredWidth() + ", " + host.getMeasuredHeight());
        return host;
      } else {
        WXLogUtils.e(TAG, "WXMapInfoWindowComponent with marker id " + marker.getId() + " not found");
      }
      return null;
    }
  }

  private Map<String, Object> convertLatLng(LatLng latLng) {
    Map<String, Object> result = new HashMap<>(2);
    result.put("latitude", latLng.latitude);
    result.put("longitude", latLng.longitude);
    return result;
  }

  interface MapOperationTask {
    void execute(TextureMapView mapView);
  }
}
