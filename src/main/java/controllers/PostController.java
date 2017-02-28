package controllers;

import com.scorpiac.javarant.Rant;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.FlowPane;

/**
 * Created by Tahnik Mustasin on 19/02/2017.
 */
public class PostController{

    @FXML private Label rantText;
    @FXML private ImageView rantImage;
    @FXML private Label rantCommentCount;
    @FXML private FlowPane rantTagContainer;

    private Rant rant;

    public PostController(Rant rant) {
        this.rant = rant;
    }

    public void initialize() {
        rantText.setText(rant.getContent());
        rantCommentCount.setText(String.valueOf(rant.getCommentCount()));
        loadImage(rant.getImage().getUrl());
    }

    private void loadImage(String url) {
        try {
            Image img = new Image(url);
            rantImage.setImage(img);
        }
        catch (Exception e)
        {

        }
    }

}
