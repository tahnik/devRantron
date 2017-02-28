package controllers;

import javafx.animation.Interpolator;
import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.layout.VBox;
import javafx.util.Duration;
import model.DrawerModel;

import java.net.URL;
import java.util.ResourceBundle;

/**
 * Created by Tahnik Mustasin on 19/02/2017.
 */
public class DrawerController implements Initializable {

    @FXML private VBox collapsible_drawer;
    @FXML private VBox uncollapsible_drawer;


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
        final Timeline timeline = new Timeline();
        final KeyValue kv = new KeyValue(collapsible_drawer.prefWidthProperty(), 0, Interpolator.EASE_IN);
        final KeyFrame kf = new KeyFrame(Duration.millis(250), kv);
        timeline.getKeyFrames().add(kf);
        timeline.play();
    }
    private void openDrawer() {
        final Timeline timeline = new Timeline();
        final KeyValue kv = new KeyValue(collapsible_drawer.prefWidthProperty(), 155, Interpolator.EASE_OUT);
        final KeyFrame kf = new KeyFrame(Duration.millis(200), kv);
        timeline.getKeyFrames().add(kf);
        timeline.play();
    }
}
