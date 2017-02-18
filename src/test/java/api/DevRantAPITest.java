package api;

import com.scorpiac.javarant.Rant;
import com.scorpiac.javarant.Sort;
import com.scorpiac.javarant.exceptions.NoSuchRantException;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.instanceOf;
import static org.junit.Assert.assertNotNull;

/**
 * Created by Tahnik Mustasin on 16/02/2017.
 */
public class DevRantAPITest {

    @Rule
    public final ExpectedException expectedException = ExpectedException.none();

    @Before
    public void setUp() {

    }

    @Test
    public void testGetRant() throws InterruptedException, ExecutionException, TimeoutException {
        DevRantAPI devRantAPI = new DevRantAPI();
        expectedException.expect(ExecutionException.class);
        expectedException.expectCause(anyOf(
                instanceOf(NoSuchRantException.class)
                // TODO: Once LucaScorpion adds more exception it needs to be added in here
        ));

        devRantAPI.getRant(-902).get(15, TimeUnit.SECONDS);
        Thread.sleep(3600);
        devRantAPI.getRant(0).get(15, TimeUnit.SECONDS);
        Thread.sleep(3600);
        devRantAPI.getRant(999999999).get(15, TimeUnit.SECONDS);
        Thread.sleep(3600);
        devRantAPI.getRant(-1).get(15, TimeUnit.SECONDS);
        Thread.sleep(3600);
    }

    @Test
    public void testGetRants() throws ExecutionException, InterruptedException {
        DevRantAPI devRantAPI = new DevRantAPI();
        List<Rant> rants = null;
        rants = devRantAPI.getRants(Sort.ALGO, -1, -1).get();
        assertNotNull(rants);
        assertNotNull(rants.get(0));
        Thread.sleep(3600);
        rants = devRantAPI.getRants(Sort.ALGO, 0, -1).get();
        assertNotNull(rants);
        Thread.sleep(3600);
        rants = devRantAPI.getRants(Sort.ALGO, -1, 0).get();
        assertNotNull(rants);
        assertNotNull(rants.get(0));
        Thread.sleep(3600);
        rants = devRantAPI.getRants(Sort.ALGO, 0, 0).get();
        assertNotNull(rants);
        Thread.sleep(3600);
        rants = devRantAPI.getRants(Sort.ALGO, -999, -999).get();
        assertNotNull(rants);
        assertNotNull(rants.get(0));
        Thread.sleep(3600);
    }

    @Test
    public void testSearchRant() throws ExecutionException, InterruptedException {
        DevRantAPI devRantAPI = new DevRantAPI();
        assertNotNull(devRantAPI.search("-1").get());
        Thread.sleep(3600);
        assertNotNull(devRantAPI.search("null").get());
        Thread.sleep(3600);
        assertNotNull(devRantAPI.search("#!2dsa)_*78").get());
        Thread.sleep(3600);
    }

    @Test
    public void testGetWeekly() throws ExecutionException, InterruptedException {
        DevRantAPI devRantAPI = new DevRantAPI();
        List<Rant> rants = null;
        rants = devRantAPI.getWeekly(Sort.ALGO, -1, -1).get();
        assertNotNull(rants);
        assertNotNull(rants.get(0));
        Thread.sleep(3600);
        rants = devRantAPI.getWeekly(Sort.ALGO, 0, -1).get();
        assertNotNull(rants);
        Thread.sleep(3600);
        rants = devRantAPI.getWeekly(Sort.ALGO, -1, 0).get();
        assertNotNull(rants);
        assertNotNull(rants.get(0));
        Thread.sleep(3600);
        rants = devRantAPI.getWeekly(Sort.ALGO, 0, 0).get();
        assertNotNull(rants);
        Thread.sleep(3600);
        rants = devRantAPI.getWeekly(Sort.ALGO, -999, -999).get();
        assertNotNull(rants);
        assertNotNull(rants.get(0));
        Thread.sleep(3600);
    }

}
