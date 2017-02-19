package controllers;

import javafx.animation.Interpolator;
import javafx.animation.TranslateTransition;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.layout.AnchorPane;
import javafx.util.Duration;
import model.DrawerModel;

import java.net.URL;
import java.util.ResourceBundle;

/**
 * Created by Tahnik Mustasin on 19/02/2017.
 */
public class DrawerController implements Initializable {

    @FXML private AnchorPane drawerAnchPane;


    @Override
    public void initialize(URL location, ResourceBundle resources) {
        DrawerModel.getInstance().getVisibilityProperty().addListener(e -> changeDrawerState());
    }

    private void changeDrawerState() {
        if(DrawerModel.getInstance().getVisibilityProperty().get()) {
            closeDrawer();
        }else {
            openDrawer();
        }
    }

    private void closeDrawer() {
        TranslateTransition tt = new TranslateTransition(Duration.millis(400), drawerAnchPane);
        tt.setInterpolator(Interpolator.EASE_OUT);
        tt.setFromX(0);
        tt.setToX(-drawerAnchPane.getWidth());
        tt.play();
    }
    private void openDrawer() {
        TranslateTransition tt = new TranslateTransition(Duration.millis(400), drawerAnchPane);
        tt.setFromX(-drawerAnchPane.getWidth());
        tt.setToX(0);
        tt.setInterpolator(Interpolator.EASE_IN);
        tt.play();
    }
}
