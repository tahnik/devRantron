package api;

import com.scorpiac.javarant.DevRant;
import com.scorpiac.javarant.Rant;
import com.scorpiac.javarant.Sort;

import java.util.List;

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
    private interface DevRantListener {
    }

    /*
    Get current feed
     */
    public interface FeedListener extends DevRantListener {
        void onResult(List<Rant> rants);
    }

    /*
    Get a rant
     */
    public interface RantListener extends DevRantListener {
        void onResult(Rant rant);
    }

    private DevRantListener listener;
    private DevRant devRant;

    public DevRantAPI(DevRantListener listener) {
        this.listener = listener;
        devRant = new DevRant();
    }


    /**
     * Get a list of rants.
     *
     * @param sort  The sorting method.
     * @param limit How many rants to get.
     * @param skip  How many rants to skip.
     */
    public void getRants(Sort sort, int limit, int skip) {
        new Thread(() -> {
            List<Rant> rants = devRant.getRants(sort, limit, skip);
            ((FeedListener) listener).onResult(rants);
        }).start();
    }


    /**
     * Get a rant by its id.
     *
     * @param id The id of the rant to get.
     */
    public void getRant(int id) {
        new Thread(() -> {
            Rant rant = devRant.getRant(id);
            ((RantListener) listener).onResult(rant);
        }).start();
    }
}
