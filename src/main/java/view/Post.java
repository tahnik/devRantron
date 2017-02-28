package view;

import com.scorpiac.javarant.Rant;
import controllers.PostController;
import javafx.fxml.FXMLLoader;
import javafx.scene.layout.AnchorPane;

import java.io.IOException;

/**
 * Created by Tahnik Mustasin on 28/02/2017.
 */
public class Post extends AnchorPane {
    public Post(Rant rant) {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(
                                "/views/control_post.fxml"));
        fxmlLoader.setRoot(this);
        fxmlLoader.setController(new PostController(rant));
        try {
            fxmlLoader.load();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
