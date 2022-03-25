package Beans;

import DataBase.DataBaseWorker;
import Entity.Point;

import javax.ejb.EJB;
import javax.ejb.Stateful;
import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.LinkedList;

@Stateless
public class MainPageBean {

    @EJB
    DataBaseWorker dbw;

    private String login;

    private boolean checkResult(double x, double y, double r) {
        if (x <= 0 && y <= 0) {
            return -x - r / 2 <= y;
        }
        if (x <= 0) {
            return -x <= r && y <= r;
        }
        if (y <= 0) {
            return x * x + y * y <= r * r;
        }
        return false;
    }

    private boolean validateValue(double x, double y, double r) {
        return -4 <= x && x <= 4 && -3 <= y && y <= 3 && r >= 1;
    }

    public boolean addPoint(double x, double y, double r){
        if (validateValue(x,y,r)){
            dbw.addPoint(new Point(x,y,r, checkResult(x,y,r), login));
            return true;
        }
        return false;
    }

    public ArrayList<Point> getPointList(){
        return dbw.getPoints(login);
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void clearTable(){
        dbw.deletePoints(login);
    }
}
