import javafx.animation.TranslateTransition;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import javafx.util.Duration;

public class Main extends Application{

    @Override
    public void start(Stage primaryStage) throws Exception{
        BorderPane pane = FXMLLoader.load(getClass().getResource("/views/window_main_pane.fxml"));;
        HBox drawer = FXMLLoader.load(getClass().getResource("/views/drawer.fxml"));
        pane.setLeft(drawer);
        primaryStage.setTitle("devRant Unofficial");
        primaryStage.setScene(new Scene(pane, 800, 600));
        primaryStage.setMinHeight(800);
        primaryStage.setMinWidth(600);
        primaryStage.show();

        TranslateTransition tt = new TranslateTransition(Duration.millis(900), drawer);
        tt.setFromX(0);
        tt.setToX(-200);
        tt.setAutoReverse(true);
        tt.setCycleCount(99);
        //tt.play();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
