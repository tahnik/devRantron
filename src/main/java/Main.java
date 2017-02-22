import controllers.VoteControl;
import javafx.animation.TranslateTransition;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;
import javafx.util.Duration;

public class Main extends Application{

    @Override
    public void start(Stage primaryStage) throws Exception{
        BorderPane pane = FXMLLoader.load(getClass().getResource("/views/window_main_pane.fxml"));;
        AnchorPane drawer = FXMLLoader.load(getClass().getResource("/views/drawer.fxml"));

        VoteControl votes = new VoteControl();
        votes.setScore("1010");
        pane.setCenter(votes);

        //BorderPane obj = FXMLLoader.load(getClass().getResource("/views/control_vote.fxml"));
        //pane.setCenter(obj);

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
