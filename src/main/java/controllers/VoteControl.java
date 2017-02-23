package controllers;

import javafx.beans.property.StringProperty;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;

import java.io.IOException;

/**
 * Created by Tahnik Mustasin on 19/02/2017.
 */
public class VoteControl extends BorderPane{

    @FXML private Button downvoteButton;
    @FXML private Button upvoteButton;
    @FXML private Label votesLabel;


    public enum VoteButtonType
    {
        UP,
        DOWN
    }

    public VoteControl()
    {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(
                "/views/control_vote.fxml"));
        fxmlLoader.setRoot(this);
        fxmlLoader.setController(this);

        try {
            fxmlLoader.load();

            initialize();
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    public String getScore() {
        return textProperty().get();
    }

    public void setScore(String value) {
        textProperty().set(value);
    }


    public void setScore(int score) {
        setScore(String.valueOf(score));
    }

    public StringProperty textProperty() {
        return votesLabel.textProperty();
    }

    public void initialize() {
        downvoteButton.setOnMouseClicked(e -> votePressed(VoteButtonType.DOWN));
        upvoteButton.setOnMouseClicked(e -> votePressed(VoteButtonType.UP));
    }

    private void votePressed(VoteButtonType type) {
        votesLabel.setText(type.toString());
    }

}
