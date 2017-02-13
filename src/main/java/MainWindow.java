import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;

import java.net.URL;
import java.util.ResourceBundle;

public class MainWindow implements Initializable {

    @FXML private TextArea textArea;
    @FXML private Label textLabel;
    @FXML private Label pressMeLabel;
    @FXML private Button pressMe;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        pressMe.setOnMouseClicked((e) -> {
            onPressMeBtnClicked();
        });
        textArea.textProperty().bindBidirectional(textLabel.textProperty());
    }

    private void onPressMeBtnClicked() {
        pressMeLabel.setText("You pressed me!");
    }
}
