package com.mojito_guardian;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;
import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {
  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSharedPreferencesReactPackage(),
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
