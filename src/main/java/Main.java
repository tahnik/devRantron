import api.DevRantAPI;
import com.scorpiac.javarant.Sort;
import com.scorpiac.javarant.exceptions.NoSuchRantException;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application{

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("/views/window_main_pane.fxml"));
        primaryStage.setTitle("devRant Unofficial");
        primaryStage.setScene(new Scene(root, 600, 600));
        primaryStage.setMinHeight(600);
        primaryStage.setMinWidth(600);
        primaryStage.show();

        DevRantAPI devRantAPI = new DevRantAPI();
        devRantAPI.getRants(Sort.ALGO, 10, 0);
        testGetRant();
    }


    public static void main(String[] args) {
        launch(args);
    }

    public void testGetRant() {
        DevRantAPI devRantAPI = new DevRantAPI();
        devRantAPI.getRant(-902)
                .thenAccept(rant1 -> {
                    System.out.println(rant1.link());
                })
                .exceptionally(ex -> {
                    if(ex.getCause() instanceof NoSuchRantException) {
                        // TODO: Show user that rant is not found
                    }
                    return null;
                });
    }
}
