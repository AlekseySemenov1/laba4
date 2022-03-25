package Entity;

import javax.persistence.*;

@Entity
@Table(name = "PointStorage")
public class Point {
    @Id
    @SequenceGenerator(name = "Id_creator", sequenceName = "New_id", allocationSize = 1)
    @GeneratedValue(generator = "Id_creator")
    private int id;

    @Column(name = "Xvalue")
    private double x;

    @Column(name = "Yvalue")
    private double y;

    @Column(name = "Rvalue")
    private double r;

    @Column(name = "Result")
    private boolean result;

    @Column(name = "Owner")
    private String login;

    public Point(double x, double y, double r, boolean result, String login) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.login = login;
    }

    public Point() {
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}