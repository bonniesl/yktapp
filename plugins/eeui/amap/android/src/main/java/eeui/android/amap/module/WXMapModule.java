package eeui.android.amap.module;

import androidx.annotation.Nullable;
import android.util.Log;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps.AMapUtils;
import com.amap.api.maps.MapsInitializer;
import com.amap.api.maps.model.LatLng;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.utils.WXLogUtils;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import eeui.android.amap.component.WXMapPolygonComponent;


/**
 * Created by budao on 2017/1/24.
 */

public class WXMapModule extends WXModule {
  private static final String RESULT = "result";
  private static final String DATA = "data";

  private static final String RESULT_OK = "success";
  private static final String RESULT_FAILED = "failed";

  /**
   * get line distance between to POI.
   */
  @JSMethod
  public void getLineDistance(String posA, String posB, @Nullable final JSCallback callback) {
    Log.v("getDistance", posA + ", " + posB);
    float distance = -1;
    try {
      JSONArray jsonArray = new JSONArray(posA);
      LatLng latLngA = new LatLng(jsonArray.optDouble(1), jsonArray.optDouble(0));
      JSONArray jsonArrayB = new JSONArray(posB);
      LatLng latLngB = new LatLng(jsonArrayB.optDouble(1), jsonArrayB.optDouble(0));
      distance = AMapUtils.calculateLineDistance(latLngA, latLngB);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    if (callback != null) {
      HashMap map = new HashMap(2);
      HashMap data = new HashMap(1);
      data.put("distance", distance);
      map.put(DATA, data);
      map.put(RESULT, distance >= 0 ? RESULT_OK : RESULT_FAILED);
      callback.invoke(map);
    }

  }

  @JSMethod
  public void polygonContainsMarker(String position, String id, @Nullable final JSCallback callback) {
    boolean contains = false;
    boolean success = false;
    try {
      JSONArray jsonArray = new JSONArray(position);
      LatLng latLng = new LatLng(jsonArray.optDouble(1), jsonArray.optDouble(0));

      WXComponent component = findComponent(id);

      if (component != null && component instanceof WXMapPolygonComponent) {
        contains = ((WXMapPolygonComponent) component).contains(latLng);
        success = true;
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }
    if (callback != null) {
      Map<String, Object> map = new HashMap<>();
      map.put(DATA, contains);
      map.put(RESULT, success ? RESULT_OK : RESULT_FAILED);
      callback.invoke(map);
    }

  }

  /**
   * get user location.
   */
  @JSMethod
  public void getUserLocation(String id, @Nullable final JSCallback callback) {
    final AMapLocationClient client = new AMapLocationClient(
        WXEnvironment.getApplication().getApplicationContext());
    final AMapLocationClientOption clientOption = new AMapLocationClientOption();
    //??????????????????
    client.setLocationListener(new AMapLocationListener() {
      public void onLocationChanged(AMapLocation aMapLocation) {
        if (aMapLocation != null && aMapLocation.getErrorCode() == 0) {
          if (callback != null) {
            HashMap map = new HashMap(2);
            HashMap data = new HashMap(1);
            ArrayList position = new ArrayList();
            position.add(aMapLocation.getLongitude());
            position.add(aMapLocation.getLatitude());
            data.put("position", position);
            map.put(DATA, data);
            map.put(RESULT, aMapLocation.getLongitude() > 0 && aMapLocation.getLatitude() > 0 ? RESULT_OK : RESULT_FAILED);
            callback.invoke(map);
          }
        } else {
          String errText = "????????????," + aMapLocation.getErrorCode() + ": " + aMapLocation.getErrorInfo();
          WXLogUtils.e("WXMapModule", errText);
        }
        if (client != null) {
          client.stopLocation();
          client.onDestroy();
        }
      }
    });
    //??????????????????????????????
    clientOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
    clientOption.setOnceLocation(true);
    //??????????????????
    client.setLocationOption(clientOption);
    // ????????????????????????????????????????????????????????????????????????????????????????????????????????????
    // ??????????????????????????????????????????????????????????????????2000ms?????????????????????????????????stopLocation()???????????????????????????
    // ???????????????????????????????????????????????????onDestroy()??????
    // ?????????????????????????????????????????????????????????????????????stopLocation()???????????????????????????sdk???????????????
    client.startLocation();
  }



  @JSMethod
  public void init(String appKey){
    MapsInitializer.setApiKey(appKey);
    AMapLocationClient.setApiKey(appKey);
  }
}
