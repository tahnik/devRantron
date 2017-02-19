package model;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;

/**
 * Created by Tahnik Mustasin on 19/02/2017.
 */
public class DrawerModel {
    private BooleanProperty isClosed;

    private static DrawerModel instance;

    private DrawerModel() {
        isClosed = new SimpleBooleanProperty(false);
    }

    public static DrawerModel getInstance() {
        if(instance == null) {
            instance = new DrawerModel();
        }
        return instance;
    }

    public BooleanProperty getVisibilityProperty() {
        return isClosed;
    }

    public void toggleVisibilityState() {
        if(isClosed.get()) {
            isClosed.setValue(false);
        }else {
            isClosed.setValue(true);
        }
    }
}
