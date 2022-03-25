package Servlets;

import Beans.MainPageBean;
import DataBase.DataBaseWorker;
import Entity.Point;
import Entity.User;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

@WebServlet(name = "AuthorizationServlet", value = "/Servlet", urlPatterns = "/login")
public class AuthorizationServlet extends HttpServlet {

    @EJB
    private DataBaseWorker dbw;

    @EJB
    private MainPageBean mpb;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String login = request.getParameter("login");
            String password = request.getParameter("password");
            if (login != null && password != null) {
                MessageDigest ms = MessageDigest.getInstance("MD5");
                String pepper = "1w5a7c";
                byte[] hash = ms.digest((password + pepper).getBytes(StandardCharsets.UTF_8));
                User user = dbw.getUser(login);
                if (user != null && Arrays.equals(user.getPassword(), hash)) {
                    System.out.println("Вход выполнен");
                    response.setStatus(200);
                } else {
                    response.setStatus(401);
                    System.out.println("Неверный логин или пароль");
                    response.getWriter().println("Неверный логин или пароль");
                }
            } else {
                response.setStatus(406);
                System.out.println("Логин или пароль не соответствуют условию");
                response.getWriter().println("Логин или пароль не соответствуют условию");
            }
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Нет такого алгоритма");
        }
    }
}
