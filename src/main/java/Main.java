import api.DevRantAPI;
import com.scorpiac.javarant.Rant;
import com.scorpiac.javarant.Sort;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import view.Post;

public class Main extends Application{

    private final DevRantAPI api  = new DevRantAPI();

    @Override
    public void start(Stage primaryStage) throws Exception{
        BorderPane pane = FXMLLoader.load(getClass().getResource("/views/window_main_pane.fxml"));;
        HBox drawer = FXMLLoader.load(getClass().getResource("/views/drawer.fxml"));

        pane.setLeft(drawer);
        primaryStage.setTitle("devRant Unofficial");
        Scene scene = new Scene(pane, 800, 600);
        primaryStage.setScene(scene);
        primaryStage.setMinHeight(600);
        primaryStage.setMinWidth(800);
        primaryStage.show();

        // Test code to test post.
        VBox rantContainer = (VBox) scene.lookup("#rantContainer");
        api.getRants(Sort.ALGO, 10, 0).thenAccept(results -> {
                if (results.size() > 0) {

                    for (Rant rant : results)
                    {
                        if (rant.getImage() != null) {
                            Post post = new Post(rant);
                            Platform.runLater(() -> rantContainer.getChildren().add(post));
                        }
                    }
                }
        });

    }


    public static void main(String[] args) {
        launch(args);
    }
}
