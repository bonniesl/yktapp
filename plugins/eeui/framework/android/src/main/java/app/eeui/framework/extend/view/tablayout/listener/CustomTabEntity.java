package app.eeui.framework.extend.view.tablayout.listener;

import androidx.annotation.DrawableRes;

public interface CustomTabEntity {

    String getTabName();

    String getTabTitle();

    int getTabMessage();

    boolean isTabDot();

    @DrawableRes
    int getTabSelectedIcon();

    @DrawableRes
    int getTabUnselectedIcon();

    String getTabSelectedIconUrl();

    String getTabUnselectedIconUrl();
}
