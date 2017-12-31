package com.rashreact.app;

import com.reactnativenavigation.controllers.SplashActivity;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;


public class MainActivity extends  SplashActivity {
    @Override 
    public LinearLayout createSplashLayout(){
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);
        view.setBackgroundColor(Color.parseColor("#521751"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#fa923f"));
        textView.setText("RASH");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        view.addView(textView);
        return view;
    }
}
