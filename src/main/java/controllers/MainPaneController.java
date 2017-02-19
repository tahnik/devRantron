package controllers;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import model.DrawerModel;

import java.net.URL;
import java.util.ResourceBundle;

/**
 * Created by Tahnik Mustasin on 19/02/2017.
 */
public class MainPaneController implements Initializable {

    private boolean isClosed = false;
    @FXML private Button drawerControllerButton;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        drawerControllerButton.setOnMouseClicked(e -> changeDrawerState());
    }

    private void changeDrawerState() {
        DrawerModel.getInstance().toggleVisibilityState();
    }
}
