import api.DevRantAPI;
import com.scorpiac.javarant.Rant;
import com.scorpiac.javarant.Sort;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.util.List;

public class Main extends Application implements DevRantAPI.FeedListener, DevRantAPI.RantListener{

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("/views/window_main_pane.fxml"));
        primaryStage.setTitle("devRant Unofficial");
        primaryStage.setScene(new Scene(root, 600, 600));
        primaryStage.setMinHeight(600);
        primaryStage.setMinWidth(600);
        primaryStage.show();

        DevRantAPI devRantAPI = new DevRantAPI(this);
        devRantAPI.getRants(Sort.ALGO, 10, 0);
        devRantAPI.getRant(422850);

    }


    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void onResult(List<Rant> rants) {
        System.out.println(rants.size());
    }

    @Override
    public void onResult(Rant rant) {
        System.out.println(rant.link());
    }
}
