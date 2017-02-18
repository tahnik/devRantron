package api;

import com.scorpiac.javarant.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by Tahnik Mustasin on 15/02/2017.
 *
 * Wrapper class for devRant API.
 *
 * This class uses LucaScorpion's JavaRant api and
 * wraps it using threads so that it doesn't block the main thread.
 *
 * It also uses some interfaces which can be used by classes to get results
 * from the JavaRant api. It uses listeners to notify the listening classes
 * when a result has been received from the api.
 *
 */
public class DevRantAPI {
    private DevRant devRant;
    private ExecutorService executorService;

    public DevRantAPI() {
        devRant = new DevRant();
        executorService = Executors.newCachedThreadPool();
    }


    /**
     * Get a list of rants.
     *
     * @param sort  The sorting method.
     * @param limit How many rants to get.
     * @param skip  How many rants to skip.
     */
    public CompletableFuture<List<Rant>> getRants(Sort sort, int limit, int skip) {
        return CompletableFuture.supplyAsync(() -> devRant.getRants(sort, limit, skip), executorService);
    }


    /**
     * Get a rant by its id.
     *
     * @param id The id of the rant to get.
     */
    public CompletableFuture<Rant> getRant(int id) {
        return CompletableFuture.supplyAsync(() -> devRant.getRant(id), executorService);
    }

    /**
     * Search for rants matching a certain term.
     *
     * @param term The term to search for.
     * @return A list of rants matching the search term.
     */
    public CompletableFuture<List<Rant>> search(String term) {
        return CompletableFuture.supplyAsync(() -> devRant.search(term), executorService);
    }

    /**
     * Get a random rant with at least 15 ++'s.
     *
     * @return A random rant.
     */
    public CompletableFuture<Rant> getSurprise() {
        return CompletableFuture.supplyAsync(() -> devRant.getSurprise(), executorService);
    }

    /**
     * Get the weekly rants.
     *
     * @param sort  The sorting method.
     * @param limit How many rants to get.
     * @param skip  How many rants to skip.
     * @return The weekly rants.
     */
    public CompletableFuture<List<Rant>> getWeekly(Sort sort, int limit, int skip) {
        return CompletableFuture.supplyAsync(() -> devRant.getWeekly(), executorService);
    }

    /**
     * Get the collabs.
     *
     * @param limit How many rants to get.
     * @param skip  How many rants to skip.
     * @return A list of collabs.
     */
    public CompletableFuture<List<Collab>> getCollabs(int limit, int skip) {
        return CompletableFuture.supplyAsync(() -> devRant.getCollabs(), executorService);
    }

    /**
     * Get a collab by its id.
     *
     * @param id The id of the collab to get.
     * @return The collab.
     */
    public CompletableFuture<Collab> getCollab(int id) {
        return CompletableFuture.supplyAsync(() -> devRant.getCollab(id), executorService);
    }

    /**
     * Get a user by their username.
     *
     * @param username The username of the user to get.
     * @return The user.
     */
    public CompletableFuture<User> getUser(String username) {
        return CompletableFuture.supplyAsync(() -> devRant.getUser(username), executorService);
    }

    /**
     * Get a user by their id.
     *
     * @param id The id of the user to get.
     * @return The user.
     */
    public CompletableFuture<User> getUser(int id) {
        return CompletableFuture.supplyAsync(() -> devRant.getUser(id), executorService);
    }

    /**
     * Vote on a rant.
     *
     * @param rant The rant to vote on.
     * @param vote The vote.
     * @return Whether the vote was successful.
     */
    public CompletableFuture<Boolean> vote(Rant rant, Vote vote) {
        return CompletableFuture.supplyAsync(() -> devRant.vote(rant, vote), executorService);
    }

    /**
     * Vote on a comment.
     *
     * @param comment The comment to vote on.
     * @param vote    The vote.
     * @return Whether the vote was successful.
     */
    public CompletableFuture<Boolean> vote(Comment comment, Vote vote) {
        return CompletableFuture.supplyAsync(() -> devRant.vote(comment, vote), executorService);
    }

    /**
     * Vote on a comment.
     *
     * @param id   The id of the comment.
     * @param vote The vote.
     * @return Whether the vote was successful.
     */
    public CompletableFuture<Boolean> voteComment(int id, Vote vote) {
        return CompletableFuture.supplyAsync(() -> devRant.voteComment(id, vote), executorService);
    }

    /**
     * Post a rant.
     *
     * @param rant The content of the rant.
     * @param tags The tags.
     * @return Whether posting the rant was successful.
     */
    public CompletableFuture<Boolean> postRant(String rant, String tags) {
        return CompletableFuture.supplyAsync(() -> devRant.postRant(rant, tags));
    }

    /**
     * Post a comment.
     *
     * @param rant    The rant to post the comment on.
     * @param comment The content of the comment.
     * @return Whether posting the comment was successful.
     */
    public CompletableFuture<Boolean> postComment(Rant rant, String comment) {
        return CompletableFuture.supplyAsync(() -> devRant.postComment(rant, comment), executorService);
    }

    /**
     * Post a comment.
     *
     * @param rantId  The id of the rant to post the comment on.
     * @param comment The content of the comment.
     * @return Whether posting the comment was successful.
     */
    public CompletableFuture<Boolean> postComment(int rantId, String comment) {
        return CompletableFuture.supplyAsync(() -> devRant.postComment(rantId, comment), executorService);
    }

}
