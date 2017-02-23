package controllers;

import com.scorpiac.javarant.Rant;
import javafx.beans.property.StringProperty;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Tahnik Mustasin on 19/02/2017.
 */
public class PostControl extends BorderPane{

    @FXML private Label textLabel;
    @FXML private HBox tagsList; //TODO: Make it a control
    @FXML private ImageView imageView;
    @FXML private VoteControl voteControl;

    private Rant rant;

    public  PostControl(Rant rant)
    {
        this();

        this.rant = rant;

        setText(rant.getContent());
        voteControl.setScore(rant.getScore());
    }

    public PostControl()
    {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(
                "/views/control_post.fxml"));
        fxmlLoader.setRoot(this);
        fxmlLoader.setController(this);

        try {
            fxmlLoader.load();
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    public String getText() {
        return textProperty().get();
    }

    public void setText(String value) {
        textProperty().set(value);
    }

    public StringProperty textProperty() {
        return textLabel.textProperty();
    }

    public void testInitialize() {
        textLabel.setText("this is a test\n" +
                "this is a test\n" +
                "this is a test\n" +
                "this is a test\n" +
                "this is a test\n" +
                "this is a test\n");

        InputStream ss = getClass().getResourceAsStream("/images/cartoon1.png");

        Image img = new Image(ss);
        imageView.setImage(img);
    }

}
