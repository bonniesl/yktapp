package app.eeui.framework.ui;

import android.app.Activity;
import android.app.Application;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.InitConfig.Builder;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.bridge.ResultCallback;
import com.taobao.weex.common.WXException;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import app.eeui.framework.BuildConfig;
import app.eeui.framework.activity.PageActivity;
import app.eeui.framework.activity.ScanActivity;
import app.eeui.framework.extend.adapter.DrawableLoader;
import app.eeui.framework.extend.adapter.ImageAdapter;
import app.eeui.framework.extend.annotation.ModuleEntry;
import app.eeui.framework.extend.bean.PageBean;
import app.eeui.framework.extend.integration.glide.Glide;
import app.eeui.framework.extend.integration.glide.load.engine.DiskCacheStrategy;
import app.eeui.framework.extend.integration.glide.request.RequestOptions;
import app.eeui.framework.extend.integration.glide.request.target.SimpleTarget;
import app.eeui.framework.extend.integration.glide.request.transition.Transition;
import app.eeui.framework.extend.integration.iconify.Iconify;
import app.eeui.framework.extend.integration.iconify.fonts.IoniconsModule;
import app.eeui.framework.extend.integration.swipebacklayout.BGAKeyboardUtil;
import app.eeui.framework.extend.integration.swipebacklayout.BGASwipeBackHelper;
import app.eeui.framework.extend.module.eeuiAdDialog;
import app.eeui.framework.extend.module.eeuiAjax;
import app.eeui.framework.extend.module.eeuiAlertDialog;
import app.eeui.framework.extend.module.eeuiBase;
import app.eeui.framework.extend.module.eeuiCommon;
import app.eeui.framework.extend.module.eeuiHtml;
import app.eeui.framework.extend.module.eeuiIhttp;
import app.eeui.framework.extend.module.eeuiJson;
import app.eeui.framework.extend.module.eeuiOpenApp;
import app.eeui.framework.extend.module.eeuiPage;
import app.eeui.framework.extend.module.eeuiParse;
import app.eeui.framework.extend.module.eeuiScreenUtils;
import app.eeui.framework.extend.module.eeuiShareUtils;
import app.eeui.framework.extend.module.utilcode.constant.PermissionConstants;
import app.eeui.framework.extend.module.utilcode.util.DeviceUtils;
import app.eeui.framework.extend.module.utilcode.util.FileUtils;
import app.eeui.framework.extend.module.utilcode.util.PermissionUtils;
import app.eeui.framework.extend.module.utilcode.utilcodeModule;
import app.eeui.framework.extend.view.loading.LoadingDialog;
import app.eeui.framework.extend.view.webviewBridge.JsCallback;
import app.eeui.framework.ui.component.a.A;
import app.eeui.framework.ui.component.banner.Banner;
import app.eeui.framework.ui.component.button.Button;
import app.eeui.framework.ui.component.grid.Grid;
import app.eeui.framework.ui.component.icon.Icon;
import app.eeui.framework.ui.component.marquee.Marquee;
import app.eeui.framework.ui.component.navbar.Navbar;
import app.eeui.framework.ui.component.navbar.NavbarItem;
import app.eeui.framework.ui.component.recyler.Recyler;
import app.eeui.framework.ui.component.ripple.Ripple;
import app.eeui.framework.ui.component.scrollHeader.ScrollHeader;
import app.eeui.framework.ui.component.scrollText.ScrollText;
import app.eeui.framework.ui.component.sidePanel.SidePanel;
import app.eeui.framework.ui.component.sidePanel.SidePanelMenu;
import app.eeui.framework.ui.component.tabbar.Tabbar;
import app.eeui.framework.ui.component.tabbar.TabbarPage;
import app.eeui.framework.ui.component.webView.WebView;
import app.eeui.framework.ui.module.WeexDebugModule;
import app.eeui.framework.ui.module.WeexEventModule;
import app.eeui.framework.ui.module.WeexModule;
import app.eeui.framework.ui.module.WeexNavigationBarModule;
import app.eeui.framework.ui.module.WeexNavigatorModule;
import app.eeui.framework.ui.module.WeexVersionUpdateModule;
import dalvik.system.BaseDexClassLoader;
import dalvik.system.DexFile;
import dalvik.system.PathClassLoader;

/**
 * Created by WDM on 2018/3/27.
 */

public class eeui {

    private static final String TAG = "eeui";

    private static Application application;

    private static LinkedList<Activity> mActivityList = new LinkedList<>();

    public static int finishingNumber = 0;

    public static Application getApplication() {
        return application;
    }

    public static LinkedList<Activity> getActivityList() {
        return mActivityList;
    }

    public static void init(Application application) {
        register(application);
    }

    public static void reboot() {
        LinkedList<Activity> activityList = eeui.getActivityList();
        for (Activity context : activityList) {
            if (context instanceof PageActivity) {
                PageBean mPageBean = ((PageActivity) context).getPageInfo();
                if (mPageBean.isFirstPage()) {
                    eeuiBase.config.getHomeUrl(homeUrl -> {
                        ((PageActivity) context).setPageUrl(homeUrl);
                        ((PageActivity) context).reload();
                    });
                }else{
                    context.finish();
                }
            }
        }
    }

    private static void setTopActivity(final Activity activity) {
        if (mActivityList.contains(activity)) {
            if (!mActivityList.getLast().equals(activity)) {
                mActivityList.remove(activity);
                mActivityList.addLast(activity);
            }
        } else {
            mActivityList.addLast(activity);
        }
    }

    private static void register(Application app) {
        eeui.application = app;
        eeui.application.registerActivityLifecycleCallbacks(mCallbacks);

        ImageAdapter.imageEngine = eeuiJson.getString(eeuiBase.config.getObject("android"), "imageEngine").toLowerCase();

        eeuiIhttp.init(application);

        Iconify.with(new IoniconsModule());

        BGASwipeBackHelper.init(application, null);

        Builder mBuilder = new Builder();
        mBuilder.setImgAdapter(new ImageAdapter());
        mBuilder.setDrawableLoader(new DrawableLoader(app));
        WXSDKEngine.initialize(application, mBuilder.build());

        try {
            WXSDKEngine.registerModule("eeui", WeexModule.class);
            WXSDKEngine.registerModule("debug", WeexDebugModule.class);
            WXSDKEngine.registerModule("versionUpdate", WeexVersionUpdateModule.class);
            WXSDKEngine.registerModule("navigator", WeexNavigatorModule.class);
            WXSDKEngine.registerModule("navigationBar", WeexNavigationBarModule.class);
            //
            WXSDKEngine.registerModule("event", WeexEventModule.class);
            //
            WXSDKEngine.registerComponent("a", A.class);
            WXSDKEngine.registerComponent("banner", Banner.class);
            WXSDKEngine.registerComponent("button", Button.class);
            WXSDKEngine.registerComponent("grid", Grid.class);
            WXSDKEngine.registerComponent("icon", Icon.class);
            WXSDKEngine.registerComponent("marquee", Marquee.class);
            WXSDKEngine.registerComponent("navbar", Navbar.class);
            WXSDKEngine.registerComponent("navbar-item", NavbarItem.class);
            WXSDKEngine.registerComponent("ripple", Ripple.class);
            WXSDKEngine.registerComponent("scroll-text", ScrollText.class);
            WXSDKEngine.registerComponent("scroll-view", Recyler.class);
            WXSDKEngine.registerComponent("scroll-header", ScrollHeader.class);
            WXSDKEngine.registerComponent("side-panel", SidePanel.class);
            WXSDKEngine.registerComponent("side-panel-menu", SidePanelMenu.class);
            WXSDKEngine.registerComponent("tabbar", Tabbar.class);
            WXSDKEngine.registerComponent("tabbar-page", TabbarPage.class);
            WXSDKEngine.registerComponent("web-view", WebView.class);
        } catch (WXException e) {
            e.printStackTrace();
        }

        try {
            eeuiPluginManager.init(application);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Application.ActivityLifecycleCallbacks mCallbacks = new Application.ActivityLifecycleCallbacks() {
        @Override
        public void onActivityCreated(Activity activity, Bundle bundle) {
            setTopActivity(activity);
        }

        @Override
        public void onActivityStarted(Activity activity) {
            setTopActivity(activity);
        }

        @Override
        public void onActivityResumed(Activity activity) {
            setTopActivity(activity);
        }

        @Override
        public void onActivityPaused(Activity activity) {

        }

        @Override
        public void onActivityStopped(Activity activity) {

        }

        @Override
        public void onActivitySaveInstanceState(Activity activity, Bundle bundle) {

        }

        @Override
        public void onActivityDestroyed(Activity activity) {
            mActivityList.remove(activity);
        }
    };

    /***************************************************************************************************/
    /***************************************************************************************************/
    /***************************************************************************************************/

    @SuppressWarnings("unchecked")
    static class eeuiPluginManager {
        static Field getField(String name, Class c) {
            try {
                return c.getDeclaredField(name);
            } catch (Exception e) {
                return null;
            }
        }

        static ClassLoader getClassLoader() {
            return Thread.currentThread().getContextClassLoader();
        }

        static Class<?> getClassByAddressName(String classAddressName) {
            Class mClass = null;
            try {
                mClass = Class.forName(classAddressName);
            } catch (Exception ignored) {
            }
            return mClass;
        }

        static <T> T getObjectFromField(Field field, Object arg) {
            try {
                field.setAccessible(true);
                return (T) field.get(arg);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        static ArrayList<DexFile> getMultiDex() {
            BaseDexClassLoader dexLoader = (BaseDexClassLoader) getClassLoader();
            Field f = getField("pathList", getClassByAddressName("dalvik.system.BaseDexClassLoader"));
            Object pathList = getObjectFromField(f, dexLoader);
            Field f2 = getField("dexElements", getClassByAddressName("dalvik.system.DexPathList"));
            Object[] list = getObjectFromField(f2, pathList);
            Field f3 = getField("dexFile", getClassByAddressName("dalvik.system.DexPathList$Element"));

            ArrayList<DexFile> res = new ArrayList<>();

            assert list != null;
            for (Object aList : list) {
                DexFile d = getObjectFromField(f3, aList);
                res.add(d);
            }
            return res;
        }

        static boolean canLoad(String pack) {
            List<String> ignore = new ArrayList<>();
            ignore.add("com.taobao.weex.");
            ignore.add("com.alibaba.fastjson.");
            ignore.add("com.alipay.security.");
            ignore.add("com.bumptech.glide.");
            ignore.add("com.luck.picture.");
            ignore.add("com.eeui.framework.extend.");
            ignore.add("$");
            if (contains(ignore, pack)) {
                return false;
            }
            List<String> need = new ArrayList<>();
            need.add(".entry.");
            return contains(need, pack);
        }

        public static boolean contains(List l, String s) {
            for (Object q : l) {
                if (s.contains(q + ""))
                    return true;
            }
            return false;
        }

        static void registerDex(DexFile dex, Context context) {
            if (dex == null) {
                return;
            }
            Enumeration<String> entries = dex.entries();
            PathClassLoader classLoader = (PathClassLoader) Thread.currentThread().getContextClassLoader();
            while (entries.hasMoreElements()) {
                String entryName = entries.nextElement();
                if (canLoad(entryName)) {
                    try {
                        Class entryClass = Class.forName(entryName, true, classLoader);
                        ModuleEntry wxentry = (ModuleEntry) entryClass.getAnnotation(ModuleEntry.class);
                        if (wxentry != null) {
                            Object instance = entryClass.newInstance();
                            Method entry = entryClass.getMethod("init", Context.class);
                            entry.invoke(instance, context);
                            Log.d(TAG, "?????????????????????:" + entryClass);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    } catch (NoClassDefFoundError e) {
                        e.printStackTrace();
                    } catch (ExceptionInInitializerError ex) {
                        ex.printStackTrace();
                    }
                }
            }
        }

        static void init(Context context) {
            ArrayList<DexFile> list = getMultiDex();
            for (DexFile dex : list) {
                registerDex(dex, context);
            }
        }
    }

    /***************************************************************************************************/
    /***************************************************************************************************/
    /***************************************************************************************************/

    public static Object[] objectGroup(Object... var) {
        return var;
    }

    public static JSCallback MCallback(JsCallback callback) {
        if (callback == null) {
            return null;
        }
        return new JSCallback() {
            @Override
            public void invoke(Object data) {
                try {
                    callback.apply(data);
                } catch (JsCallback.JsCallbackException je) {
                    je.printStackTrace();
                }
            }

            @Override
            public void invokeAndKeepAlive(Object data) {
                try {
                    callback.setPermanent(true);
                    callback.apply(data);
                } catch (JsCallback.JsCallbackException je) {
                    je.printStackTrace();
                }
            }
        };
    }

    public static void HCallback(JsCallback callback, Object... data) {
        if (callback == null) {
            return;
        }
        try {
            callback.apply(data);
        } catch (JsCallback.JsCallbackException je) {
            je.printStackTrace();
        }
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ???????????? ??? ?????????????????????????????????
     * @param object
     * @param callback
     */
    public void openPage(Object context, String object, JSCallback callback) {
        JSONObject json = eeuiJson.parseObject(object);
        if (json.size() == 0) {
            json.put("url", object);
        }
        if (json.getString("url") == null || json.getString("url").isEmpty()) {
            return;
        }
        JSONObject queryJson = eeuiHtml.getUrlQuery(json.getString("url"));
        if (queryJson.size() > 0) {
            String[] pageParams = {"pageName", "pageTitle", "pageType", "cache", "params", "loading", "loadingBackground", "swipeBack", "swipeFullBack", "swipeColorBack", "animated", "animatedType", "statusBarType", "statusBarColor", "statusBarAlpha", "statusBarStyle", "softInputMode", "translucent", "backgroundColor", "backPressedClose"};
            for (Map.Entry<String, Object> entry : queryJson.entrySet()) {
                if (Arrays.asList(pageParams).contains(entry.getKey())) {
                    json.put(entry.getKey(), entry.getValue());
                }
            }
        }
        //
        PageBean mBean = new PageBean();
        String pageType = eeuiJson.getString(json, "pageType", "app");
        String pageUrl = eeuiPage.rewriteUrl(context, eeuiPage.suffixUrl(pageType, json.getString("url")));
        //
        if (context instanceof WXSDKInstance) {
            context = ((WXSDKInstance) context).getContext();
        }else if (context instanceof View) {
            context = ((View) context).getContext();
        }else if (!(context instanceof Activity)) {
            return;
        }
        //??????
        mBean.setUrl(pageUrl);
        //?????????????????????????????????
        if (json.getString("pageName") != null) {
            mBean.setPageName(json.getString("pageName"));
        }
        //??????
        if (json.getString("pageTitle") != null) {
            mBean.setPageTitle(json.getString("pageTitle"));
        }
        //??????????????????weex???
        if (json.getString("pageType") != null) {
            mBean.setPageType(pageType);
        }
        //??????????????????0???
        if (json.getString("cache") != null) {
            mBean.setCache(json.getIntValue("cache"));
        }
        //??????????????????????????????
        if (json.get("params") != null) {
            mBean.setParams(json.get("params"));
        }
        //??????????????????????????????true???
        if (json.getBoolean("loading") != null) {
            mBean.setLoading(json.getBoolean("loading"));
        }
        //??????????????????????????????????????????false???
        if (json.getBoolean("loadingBackground") != null) {
            mBean.setLoadingBackground(json.getBoolean("loadingBackground"));
        }
        //????????????????????????????????????true??????????????????false???
        if (json.getBoolean("swipeBack") != null) {
            mBean.setSwipeBack(json.getBoolean("swipeBack"));
        }
        //???????????????????????????????????????????????????false???
        if (json.getBoolean("swipeFullBack") != null) {
            mBean.setSwipeFullBack(json.getBoolean("swipeFullBack"));
        }
        //?????????????????????????????????????????????????????????????????????????????????true??????????????????false???
        if (json.getBoolean("swipeColorBack") != null) {
            mBean.setSwipeColorBack(json.getBoolean("swipeColorBack"));
        }
        //????????????????????????????????????????????????true???
        if (json.getBoolean("animated") != null) {
            mBean.setAnimated(json.getBoolean("animated"));
        }
        //???????????????????????????????????????????????????
        if (json.getString("animatedType") != null) {
            mBean.setAnimatedType(json.getString("animatedType"));
        }
        //?????????????????????????????????fullscreen|immersion???statusBarType???statusBarAlpha?????????
        if (json.getString("statusBarType") != null) {
            mBean.setStatusBarType(json.getString("statusBarType"));
        }
        //??????????????????????????????#3EB4FF???
        if (json.getString("statusBarColor") != null) {
            mBean.setStatusBarColor(json.getString("statusBarColor"));
        }
        //??????????????????????????????0???
        if (json.getInteger("statusBarAlpha") != null) {
            mBean.setStatusBarAlpha(json.getInteger("statusBarAlpha"));
        }
        //???????????????
        if (json.getString("statusBarStyle") != null) {
            mBean.setStatusBarStyle(json.getBooleanValue("statusBarStyle"));
        }
        //??????????????????
        if (json.getString("softInputMode") != null) {
            mBean.setSoftInputMode(eeuiJson.getString(json, "softInputMode", "auto"));
        }
        //??????????????????????????????false???
        if (json.getBoolean("translucent") != null) {
            mBean.setTranslucent(json.getBoolean("translucent"));
        }
        //??????????????????????????????#ffffff???
        if (json.getString("backgroundColor") != null) {
            mBean.setBackgroundColor(json.getString("backgroundColor"));
        }
        //???????????????????????????true???
        if (json.getBoolean("backPressedClose") != null) {
            mBean.setBackPressedClose(json.getBoolean("backPressedClose"));
        }

        //JS????????????
        if (callback != null) {
            mBean.setCallback(callback);
        }

        eeuiPage.openWin((Context) context, mBean);
    }

    /**
     * ??????????????????
     * @param object
     * @return
     */
    public Object getPageInfo(Context context, String object) {
        String pageName = eeuiPage.getPageName(object);
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                return ((PageActivity) context).getPageInfo().toMap();
            }
            return null;
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return new HashMap<>();
        }
        return mPageBean.toMap();
    }

    /**
     * ??????????????????????????????
     * @param context
     * @param object
     * @param callback
     */
    public void getPageInfoAsync(Context context, String object, JSCallback callback) {
        if (callback == null) {
            return;
        }
        new Handler().post(() -> {
            Object info = getPageInfo(context, object);
            callback.invoke(info);
        });
    }

    /**
     * ???????????????????????????
     * @param object
     * @return
     */
    public Object getPageParams(Context context, String object) {
        String pageName = eeuiPage.getPageName(object);
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                return ((PageActivity) context).getPageInfo().getParams();
            }
            return null;
        }
        PageBean temp = eeuiPage.getWinInfo(pageName);
        if (temp == null) {
            return null;
        }
        return temp.getParams();
    }

    /**
     * ??????????????????????????????
     * @param object
     */
    public void reloadPage(Context context, String object) {
        String pageName = eeuiPage.getPageName(object);
        String newUrl = eeuiJson.getString(object, "url");
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                if (!TextUtils.isEmpty(newUrl)) {
                    ((PageActivity) context).setPageUrl(newUrl);
                }
                ((PageActivity) context).reload();
            }
            return;
        }
        eeuiPage.reloadWin(pageName, newUrl);
    }

    /**
     * ???????????? ??? ?????????????????????????????????
     * @param object
     */
    public void closePage(Context context, String object) {
        String pageName = eeuiPage.getPageName(object);
        if (context instanceof PageActivity) {
            boolean animated = eeuiJson.getBoolean(eeuiJson.parseObject(object), "animated", true);
            ((PageActivity) context).getPageInfo().setAnimatedClose(animated);
        }
        if (pageName.isEmpty()) {
            BGAKeyboardUtil.closeKeyboard((Activity) context);
            eeuiPage.closeActivity((Activity) context);
            return;
        }
        eeuiPage.closeWin(pageName);
    }


    /**
     * ???????????????????????????
     * @param object
     */
    public void closePageTo(Context context, String object) {
        String pageName = eeuiPage.getPageName(object);
        if (pageName.isEmpty()) {
            return;
        }
        boolean isClose = false;
        Activity lastActivity = null;
        LinkedList<Activity> array = eeui.getActivityList();
        for (int i  = 0; i < array.size(); i++) {
            if (isClose) {
                if (i + 1 == array.size()) {
                    lastActivity = array.get(i);
                }else{
                    eeuiPage.closeActivity(array.get(i));
                }
            }else {
                if (array.get(i) instanceof PageActivity) {
                    String mPageName = ((PageActivity) array.get(i)).getPageInfo().getPageName();
                    if (pageName.equals(mPageName)) {
                        isClose = true;
                    }
                }
            }
        }
        eeuiPage.closeActivity(lastActivity);
    }

    /**
     * ????????????????????????
     * @param object
     * @param mode
     */
    public void setSoftInputMode(Context context, String object, String mode) {
        String pageName = eeuiPage.getPageName(object);
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                pageName = ((PageActivity) context).getPageInfo().getPageName();
            }
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return;
        }
        PageActivity mPageActivity = ((PageActivity) mPageBean.getContext());
        mPageActivity.setSoftInputMode(mode);
    }

    /**
     * ?????????????????????????????????
     * @param context
     * @param isLight ????????????
     */
    public void setStatusBarStyle(Context context, boolean isLight) {
        if (context instanceof PageActivity) {
            ((PageActivity) context).setStatusBarStyle(isLight);
        } else {
            this.toast(context, "??????????????????????????????????????????");
        }
    }

    /**
     * ????????????????????????
     * @param object
     * @param callback  ???null???????????????
     */
    public void setPageBackPressed(Context context, String object, JSCallback callback) {
        String pageName = eeuiPage.getPageName(object);
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                pageName = ((PageActivity) context).getPageInfo().getPageName();
            }
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return;
        }
        PageActivity mPageActivity = ((PageActivity) mPageBean.getContext());
        if (callback == null) {
            mPageActivity.setOnBackPressed("eeui", () -> false);
        }else{
            mPageActivity.setOnBackPressed("eeui", () -> {
                callback.invokeAndKeepAlive(null);
                return true;
            });
        }
    }

    /**
     * ????????????????????????
     * @param object
     * @param callback  ???null???????????????
     */
    public void setOnRefreshListener(Context context, String object, JSCallback callback) {
        String pageName = eeuiPage.getPageName(object);
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                pageName = ((PageActivity) context).getPageInfo().getPageName();
            }
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return;
        }
        PageActivity mPageActivity = ((PageActivity) mPageBean.getContext());
        if (callback == null) {
            mPageActivity.setOnRefreshListener(null);
        }else{
            mPageActivity.setOnRefreshListener(callback::invokeAndKeepAlive);
        }
    }

    /**
     * ????????????????????????
     * @param object
     * @param refreshing
     */
    public void setRefreshing(Context context, String object, boolean refreshing) {
        String pageName = eeuiPage.getPageName(object);
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                pageName = ((PageActivity) context).getPageInfo().getPageName();
            }
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return;
        }
        PageActivity mPageActivity = ((PageActivity) mPageBean.getContext());
        mPageActivity.setRefreshing(refreshing);
    }

    /**
     * ????????????????????????
     * @param object
     * @param callback
     */
    public void setPageStatusListener(Context context, String object, JSCallback callback) {
        if (object == null) {
            return;
        }
        JSONObject json = eeuiJson.parseObject(object);
        String listenerName = eeuiJson.getString(json, "listenerName", object);
        if (listenerName.isEmpty()) {
            return;
        }
        String pageName = eeuiJson.getString(json, "pageName");
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                pageName = ((PageActivity) context).getPageInfo().getPageName();
            }
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return;
        }
        PageActivity mPageActivity = ((PageActivity) mPageBean.getContext());
        mPageActivity.setPageStatusListener(listenerName, callback);
    }

    /**
     * ??????????????????????????????
     * @param object
     */
    public void clearPageStatusListener(Context context, String object) {
        if (object == null) {
            return;
        }
        JSONObject json = eeuiJson.parseObject(object);
        String listenerName = eeuiJson.getString(json, "listenerName", object);
        if (listenerName.isEmpty()) {
            return;
        }
        String pageName = eeuiJson.getString(json, "pageName");
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                pageName = ((PageActivity) context).getPageInfo().getPageName();
            }
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return;
        }
        PageActivity mPageActivity = ((PageActivity) mPageBean.getContext());
        mPageActivity.clearPageStatusListener(listenerName);
    }

    /**
     * ????????????(??????)????????????
     * @param object
     * @param status
     */
    public void onPageStatusListener(Context context, String object, String status) {
        if (status == null) {
            status = object;
            object = null;
        }
        if (status == null) {
            return;
        }
        JSONObject json = eeuiJson.parseObject(object);
        String pageName = eeuiJson.getString(json, "pageName");
        if (pageName.isEmpty()) {
            if (context instanceof PageActivity) {
                pageName = ((PageActivity) context).getPageInfo().getPageName();
            }
        }
        PageBean mPageBean = eeuiPage.getWinInfo(pageName);
        if (mPageBean == null) {
            return;
        }
        PageActivity mPageActivity = ((PageActivity) mPageBean.getContext());
        mPageActivity.onPageStatusListener(eeuiJson.getString(json, "listenerName", object), status, json.get("extra"));
    }

    /**
     * ????????????????????????
     */
    public void getCacheSizePage(Context context, JSCallback callback) {
        new eeuiIhttp.getCacheSize("page", callback).start();
    }

    /**
     * ??????????????????
     */
    public void clearCachePage(Context context) {
        new eeuiIhttp.clearCache("page").start();
    }

    /**
     * ?????????????????????????????????
     * @param url
     */
    public void openWeb(Context context, String url) {
        if (url == null) {
            return;
        }
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(url));
        context.startActivity(intent);
    }

    /**
     * ????????????
     */
    public void goDesktop(Context context) {
        Intent home = new Intent(Intent.ACTION_MAIN);
        home.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        home.addCategory(Intent.CATEGORY_HOME);
        context.startActivity(home);
    }

    /**
     * ??????eeui.config.js??????????????????
     * @param key
     * @return
     */
    public Object getConfigRaw(String key) {
        return eeuiBase.config.getRawValue(key);
    }

    /**
     * ??????eeui.config.js??????????????????
     * @param key
     * @return
     */
    public String getConfigString(String key) {
        return eeuiBase.config.getString(key, "");
    }

    /**
     * ?????????????????????
     * @param key
     * @param value
     */
    public void setCustomConfig(String key, Object value) {
        eeuiBase.config.setCustomConfig(key, value);
    }

    /**
     * ?????????????????????
     * @return
     */
    public Object getCustomConfig() {
        return eeuiBase.config.getCustomConfig();
    }

    /**
     * ?????????????????????
     */
    public void clearCustomConfig() {
        eeuiBase.config.clearCustomConfig();
    }

    /**
     * ?????????url
     * @param url
     * @return
     */
    public String realUrl(String url) {
        return eeuiPage.realUrl(url);
    }

    /**
     * ????????????
     * @param context
     * @param url
     * @return
     */
    public String rewriteUrl(Object context, String url) {
        return eeuiPage.rewriteUrl(context, url);
    }

    /**
     * ??????????????????????????????ID
     * @return
     */
    public int getUpdateId() {
        JSONArray tempArray = eeuiBase.config.verifyData();
        if (tempArray.size() == 0) {
            return 0;
        }
        return eeuiParse.parseInt(tempArray.get(0));
    }

    /**
     * ???????????????????????????
     */
    public void checkUpdate() {
        eeuiBase.cloud.appData(true);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ???????????????????????????????????????
     */
    public int getStatusBarHeight(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getStatusBarHeight");
        if (var == null) {
            var = eeuiCommon.getStatusBarHeight(context);
            eeuiCommon.setVariate("__system:eeuiModule:getStatusBarHeight", var);
        }
        return eeuiParse.parseInt(var);
    }

    /**
     * ????????????????????????weexPX?????????
     */
    public int getStatusBarHeightPx(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getStatusBarHeightPx");
        if (var == null) {
            var = eeuiScreenUtils.weexDp2px(null, eeuiCommon.getStatusBarHeight(context));
            eeuiCommon.setVariate("__system:eeuiModule:getStatusBarHeightPx", var);
        }
        return eeuiParse.parseInt(var);
    }

    /**
     * ??????????????????????????????????????????
     */
    public int getNavigationBarHeight(Context context) {
        return eeuiCommon.getNavigationBarHeight(context);
    }

    /**
     * ???????????????????????????weexPX?????????
     */
    public int getNavigationBarHeightPx(Context context) {
        return eeuiScreenUtils.weexDp2px(null, eeuiCommon.getNavigationBarHeight(context));
    }

    /**
     * ??????eeui?????????
     */
    public int getVersion(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getVersion");
        if (var == null) {
            var = BuildConfig.VERSION_CODE;
            eeuiCommon.setVariate("__system:eeuiModule:getVersion", var);
        }
        return eeuiParse.parseInt(var);
    }

    /**
     * ??????eeui???????????????
     */
    public String getVersionName(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getVersionName");
        if (var == null) {
            var = BuildConfig.VERSION_NAME;
            eeuiCommon.setVariate("__system:eeuiModule:getVersionName", var);
        }
        return eeuiParse.parseStr(var);
    }

    /**
     * ???????????????????????????
     */
    public int getLocalVersion(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getLocalVersion");
        if (var == null) {
            var = eeuiCommon.getLocalVersion(context);
            eeuiCommon.setVariate("__system:eeuiModule:getLocalVersion", var);
        }
        return eeuiParse.parseInt(var);
    }

    /**
     * ?????????????????????????????????
     */
    public String getLocalVersionName(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getLocalVersionName");
        if (var == null) {
            var = eeuiCommon.getLocalVersionName(context);
            eeuiCommon.setVariate("__system:eeuiModule:getLocalVersionName", var);
        }
        return eeuiParse.parseStr(var);
    }

    /**
     * ????????????????????????,??????????????????????????????,???????????????????????????,???????????????0
     * @param version1
     * @param version2
     * @return
     */
    public int compareVersion(Context context, String version1, String version2) {
        try {
            return eeuiCommon.compareVersion(version1, version2);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * ???????????????IMEI
     */
    public String getImei(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getImei");
        if (var == null) {
            var = eeuiCommon.getImei(context);
            if (!TextUtils.isEmpty(eeuiParse.parseStr(var))) {
                eeuiCommon.setVariate("__system:eeuiModule:getImei", var);
            }
        }
        return eeuiParse.parseStr(var);
    }

    /**
     * ???????????????IMEI????????????
     */
    public void getImeiAsync(Context context, ResultCallback<String> mCallback) {
        eeuiCommon.getImeiAsync(context, mCallback);
    }

    /**
     * ???????????????????????????
     */
    public int getSDKVersionCode(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getSDKVersionCode");
        if (var == null) {
            var = DeviceUtils.getSDKVersionCode();
            eeuiCommon.setVariate("__system:eeuiModule:getSDKVersionCode", var);
        }
        return eeuiParse.parseInt(var);
    }

    /**
     * ??????????????????????????????
     */
    public String getSDKVersionName(Context context) {
        Object var = eeuiCommon.getVariate("__system:eeuiModule:getSDKVersionName");
        if (var == null) {
            var = DeviceUtils.getSDKVersionName();
            eeuiCommon.setVariate("__system:eeuiModule:getSDKVersionName", var);
        }
        return eeuiParse.parseStr(var);
    }

    /**
     * ??????IPhoneX????????????
     * @return
     */
    public boolean isIPhoneXType(Context context) {
        return false;
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ??????????????????
     * @param key
     * @param value
     * @param expired
     */
    public void setCaches(Context context, String key, Object value, Long expired) {
        if (key == null || value == null) {
            return;
        }
        eeuiCommon.setCaches(context, key, value, eeuiParse.parseLong(expired));
    }

    /**
     * ??????????????????
     * @param key
     * @param defaultVal
     */
    public Object getCaches(Context context, String key, Object defaultVal) {
        if (key == null) {
            return defaultVal;
        }
        return eeuiCommon.getCaches(context, key, defaultVal);
    }

    /**
     * ??????????????????
     * @param key
     * @param value
     * @param expired
     */
    public void setCachesString(Context context, String key, String value, Long expired) {
        if (key == null || value == null) {
            return;
        }
        eeuiCommon.setCachesString(context, key, value, eeuiParse.parseLong(expired));
    }

    /**
     * ??????????????????
     * @param key
     * @param defaultVal
     */
    public String getCachesString(Context context, String key, String defaultVal) {
        if (key == null) {
            return defaultVal;
        }
        return eeuiCommon.getCachesString(context, key, defaultVal);
    }

    /**
     * ????????????????????????
     */
    public JSONObject getAllCaches(Context context) {
        return eeuiCommon.getAllCaches(context);
    }

    /**
     * ??????????????????
     */
    public void clearAllCaches(Context context) {
        eeuiCommon.clearAllCaches(context);
    }

    /**
     * ??????????????????
     * @param key
     * @param value
     */
    public void setVariate(String key, Object value) {
        if (key == null || value == null) {
            return;
        }
        eeuiCommon.setVariate(key, value);
    }

    /**
     * ??????????????????
     * @param key
     * @param defaultVal
     */
    public Object getVariate(String key, Object defaultVal) {
        if (key == null) {
            return defaultVal;
        }
        return eeuiCommon.getVariate(key, defaultVal);
    }

    /**
     * ??????????????????
     */
    public JSONObject getAllVariate() {
        return eeuiCommon.getAllVariate();
    }

    /**
     * ??????????????????
     */
    public void clearAllVariate() {
        eeuiCommon.clearAllVariate();
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ??????????????????????????????
     * @param callback
     */
    public void getCacheSizeDir(Context context, JSCallback callback) {
        if (callback != null) {
            new Thread(() -> {
                Map<String, Object> data = new HashMap<>();
                data.put("size", FileUtils.getDirLength(context.getCacheDir()));
                callback.invoke(data);
            }).start();
        }
    }

    /**
     * ????????????????????????
     */
    public void clearCacheDir(Context context, JSCallback callback) {
        new Thread(() -> {
            JSONObject json = eeuiCommon.deleteAllInDir(context.getCacheDir());
            if (callback != null) {
                Map<String, Object> data = new HashMap<>();
                data.put("success", json.getIntValue("success"));
                data.put("error", json.getIntValue("error"));
                callback.invoke(data);
            }
        }).start();
    }

    /**
     * ??????????????????????????????
     * @param callback
     */
    public void getCacheSizeFiles(Context context, JSCallback callback) {
        if (callback != null) {
            new Thread(() -> {
                Map<String, Object> data = new HashMap<>();
                data.put("size", FileUtils.getDirLength(context.getFilesDir()));
                callback.invoke(data);
            }).start();
        }
    }

    /**
     * ????????????????????????
     */
    public void clearCacheFiles(Context context, JSCallback callback) {
        new Thread(() -> {
            JSONObject json = eeuiCommon.deleteAllInDir(context.getFilesDir());
            if (callback != null) {
                Map<String, Object> data = new HashMap<>();
                data.put("success", json.getIntValue("success"));
                data.put("error", json.getIntValue("error"));
                callback.invoke(data);
            }
        }).start();
    }

    /**
     * ?????????????????????????????????
     * @param callback
     */
    public void getCacheSizeDbs(Context context, JSCallback callback) {
        if (callback != null) {
            new Thread(() -> {
                Map<String, Object> data = new HashMap<>();
                data.put("size", FileUtils.getDirLength(new File(context.getFilesDir().getParent(), "databases")));
                callback.invoke(data);
            }).start();
        }
    }

    /**
     * ???????????????????????????
     */
    public void clearCacheDbs(Context context, JSCallback callback) {
        new Thread(() -> {
            JSONObject json = eeuiCommon.deleteAllInDir(new File(context.getFilesDir().getParent(), "databases"));
            if (callback != null) {
                Map<String, Object> data = new HashMap<>();
                data.put("success", json.getIntValue("success"));
                data.put("error", json.getIntValue("error"));
                callback.invoke(data);
            }
        }).start();
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * weex px???dp
     * @param var
     */
    public int weexPx2dp(Context context, String var) {
        return eeuiScreenUtils.weexPx2dp(null, var);
    }

    /**
     * weex dp???px
     * @param var
     */
    public int weexDp2px(Context context, String var) {
        return eeuiScreenUtils.weexDp2px(null, var);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * alert ?????????
     */
    public void alert(Context context, Object object, JSCallback callback) {
        eeuiAlertDialog.alert(context, object, callback);
    }

    /**
     * confirm ???????????????
     */
    public void confirm(Context context, Object object, JSCallback callback) {
        eeuiAlertDialog.confirm(context, object, callback);
    }

    /**
     * input ???????????????
     */
    public void input(Context context, Object object, JSCallback callback) {
        eeuiAlertDialog.input(context, object, callback);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ??????????????????
     * @param object        ??????
     * @param callback      ?????????????????????????????????????????????
     * @return
     */
    public String loading(Context context, String object, JSCallback callback) {
        return LoadingDialog.init(context, object, callback);
    }

    /**
     * ??????????????????
     */
    public void loadingClose(Context context, String var) {
        LoadingDialog.close(var);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ?????????????????????
     * @param imgUrl
     * @param callback
     */
    public void swipeCaptcha(Context context, String imgUrl, JSCallback callback) {
        PageActivity.startSwipeCaptcha(context, imgUrl, callback);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ?????????????????????
     * @param object
     * @param callback
     */
    public void openScaner(Context context, String object, JSCallback callback) {
        JSONObject json = eeuiJson.parseObject(object);
        if (json.size() == 0 && object != null && object.equals("null")) {
            json.put("desc", object);
        }
        PermissionUtils.permission(PermissionConstants.CAMERA)
                .rationale(shouldRequest -> PermissionUtils.showRationaleDialog(context, shouldRequest, "??????"))
                .callback(new PermissionUtils.FullCallback() {
                    @Override
                    public void onGranted(List<String> permissionsGranted) {
                        ScanActivity.mJSCallback = callback;
                        Intent intent = new Intent(context, ScanActivity.class);
                        intent.putExtra("title", json.getString("title"));
                        intent.putExtra("desc", json.getString("desc"));
                        intent.putExtra("continuous", json.getBooleanValue("continuous"));
                        ActivityCompat.startActivityForResult((Activity) context, intent, 0, null);
                    }

                    @Override
                    public void onDenied(List<String> permissionsDeniedForever, List<String> permissionsDenied) {
                        if (!permissionsDeniedForever.isEmpty()) {
                            PermissionUtils.showOpenAppSettingDialog(context, "??????");
                        }
                    }
                }).request();
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ??????????????????
     * @param object
     * @param callback
     */
    public void ajax(Context context, String object, JSCallback callback) {
        JSONObject json = eeuiJson.parseObject(object);
        if (json.size() == 0) {
            json.put("url", object);
        }
        eeuiAjax.ajax(context, json, callback);
    }

    /**
     * ????????????????????????
     * @param name
     */
    public void ajaxCancel(Context context, String name) {
        eeuiAjax.ajaxCancel(name);
    }

    /**
     * ??????????????????????????????
     */
    public void getCacheSizeAjax(Context context, JSCallback callback) {
        new eeuiIhttp.getCacheSize("ajax", callback).start();
    }

    /**
     * ????????????????????????
     */
    public void clearCacheAjax(Context context) {
        new eeuiIhttp.clearCache("ajax").start();
    }

    /**
     * ??????????????????
     * @param context
     * @param url
     * @param callback
     */
    public void getImageSize(Context context, String url, JSCallback callback) {
        Glide.with(context)
                .asBitmap()
                .load(url)
                .apply(new RequestOptions().diskCacheStrategy(DiskCacheStrategy.ALL))
                .into(new SimpleTarget<Bitmap>() {
                    @Override
                    public void onResourceReady(@NonNull Bitmap resource, Transition<? super Bitmap> transition) {
                        Map<String, Object> data = new HashMap<>();
                        data.put("status", "success");
                        data.put("width", resource.getWidth());
                        data.put("height", resource.getHeight());
                        callback.invoke(data);
                    }
                });
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ????????????????????????
     * @param var
     */
    public void copyText(Context context, String var) {
        ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard != null) {
            clipboard.setPrimaryClip(ClipData.newPlainText("text", var));
        }
    }

    /**
     * ????????????????????????
     * @return
     */
    public CharSequence pasteText(Context context) {
        ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard != null) {
            ClipData clip = clipboard.getPrimaryClip();
            if (clip != null && clip.getItemCount() > 0) {
                return clip.getItemAt(0).coerceToText(context);
            }
        }
        return null;
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ??????(Toast)??????
     * @param object
     */
    public void toast(Context context, String object) {
        utilcodeModule.Toast(null, object);
    }

    /**
     * ??????(Toast)??????
     */
    public void toastClose(Context context) {
        utilcodeModule.ToastClose();
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ??????????????????
     * @param object
     * @param callback
     */
    public void adDialog(Context context, String object, JSCallback callback) {
        JSONObject json = eeuiJson.parseObject(object);
        if (json.size() == 0) {
            json.put("imgUrl", object);
        }
        eeuiAdDialog.create(null, context, json, callback);
    }

    /**
     * ??????????????????????????????
     * @param dialogName
     */
    public void adDialogClose(Context context, String dialogName) {
        eeuiAdDialog.close(dialogName);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ?????????????????????
     * @param url
     */
    public void saveImage(Context context, String url, JSCallback callback) {
        eeuiCommon.saveImage(context, url, null, callback);
    }

    /**
     * ??????????????????????????????????????????
     * @param url
     * @param childDir
     */
    public void saveImageTo(Context context, String url, String childDir, JSCallback callback) {
        eeuiCommon.saveImage(context, url, childDir, callback);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ????????????APP
     * @param type
     */
    public void openOtherApp(Context context, String type) {
        if (type == null) {
            return;
        }
        switch (type.toLowerCase()) {
            case "wx":
                eeuiOpenApp.openWeChat(context);
                break;

            case "qq":
                eeuiOpenApp.openQQ(context);
                break;

            case "alipay":
                eeuiOpenApp.openAlipay(context);
                break;

            case "jd":
                eeuiOpenApp.openJd(context);
                break;
        }
    }

    /**
     * ????????????App
     * @param context
     * @param pkg
     * @param cls
     * @param callback
     */
    public void openOtherAppTo(Context context, String pkg, String cls, JSCallback callback) {
        eeuiOpenApp.openOther(context, pkg, cls, callback);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ????????????
     * @param text
     */
    public void shareText(Context context, String text) {
        eeuiShareUtils.shareText(context, text);
    }

    /**
     * ????????????
     * @param imgUrl
     */
    public void shareImage(Context context, String imgUrl) {
        eeuiShareUtils.shareImage(context, imgUrl);
    }

    /****************************************************************************************/
    /****************************************************************************************/

    /**
     * ????????????
     * @return
     */
    public void keyboardHide(Context context) {
        utilcodeModule.KeyboardUtils((Activity) context, "hideSoftInput");
    }

    /**
     * ????????????
     * @return
     */
    public Boolean keyboardStatus(Context context) {
        return (Boolean) utilcodeModule.KeyboardUtils((Activity) context, "isSoftInputVisible");
    }
}
