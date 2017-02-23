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
//        TranslateTransition tt = new TranslateTransition(Duration.millis(400), collapsible_drawer);
//        tt.setInterpolator(Interpolator.EASE_OUT);
//        tt.setFromX(0);
//        tt.setToX(-collapsible_drawer.getWidth());
//        tt.play();

//        ScaleTransition st = new ScaleTransition(Duration.millis(500), collapsible_drawer);
//        st.setFromX(1);
//        st.setToX(0);
//        st.play();

        final Timeline timeline = new Timeline();
        final KeyValue kv = new KeyValue(collapsible_drawer.prefWidthProperty(), 0, Interpolator.EASE_IN);
        final KeyFrame kf = new KeyFrame(Duration.millis(250), kv);
        timeline.getKeyFrames().add(kf);
        timeline.play();
    }
    private void openDrawer() {
//        TranslateTransition tt = new TranslateTransition(Duration.millis(400), collapsible_drawer);
//        tt.setFromX(-collapsible_drawer.getWidth());
//        tt.setToX(0);
//        tt.setInterpolator(Interpolator.EASE_IN);
//        tt.play();


        final Timeline timeline = new Timeline();
        final KeyValue kv = new KeyValue(collapsible_drawer.prefWidthProperty(), 155, Interpolator.EASE_OUT);
        final KeyFrame kf = new KeyFrame(Duration.millis(200), kv);
        timeline.getKeyFrames().add(kf);
        timeline.play();
    }
}
