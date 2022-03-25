package DataBase;

import Entity.Point;
import Entity.User;

import javax.ejb.Singleton;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Singleton
public class DataBaseWorker {
    private static final EntityManagerFactory mf = Persistence.createEntityManagerFactory("postgresql");

    public void addPoint(Point point){
        EntityManager man = mf.createEntityManager();
        man.getTransaction().begin();
        man.persist(point);
        man.getTransaction().commit();
    }

    public void addUser(User user){
        EntityManager man = mf.createEntityManager();
        man.getTransaction().begin();
        man.persist(user);
        man.getTransaction().commit();
    }

    public ArrayList<Point> getPoints(String login){
        try {
            EntityManager man = mf.createEntityManager();
            Query query = man.createQuery("select p from Point p where p.login =:log");
            query.setParameter("log", login);
            return (ArrayList<Point>) query.getResultList();
        } catch (NoResultException e){
            System.out.println("Не найдены точки юзера:" + login + "\n");
            return new ArrayList<>();
        }
    }

    public void deletePoints(String login){
        EntityManager man = mf.createEntityManager();
        Query query = man.createQuery("delete from Point where login =:log");
        query.setParameter("log", login);
        query.executeUpdate();
    }

    public User getUser(String login){
        try {
            EntityManager man = mf.createEntityManager();
            Query query = man.createQuery("select u FROM User u where u.login =:log");
            query.setParameter("log", login);
            return (User) query.getSingleResult();
        } catch (NoResultException e){
            System.out.println("Не найден юзер с логином:" + login + "\n");
            return null;
        }
    }
}
