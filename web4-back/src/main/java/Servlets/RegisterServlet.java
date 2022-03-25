package Servlets;

import DataBase.DataBaseWorker;
import Entity.User;

import javax.ejb.EJB;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@WebServlet(name = "RegisterServlet", value = "/RegisterServlet", urlPatterns = "/register")
public class RegisterServlet extends HttpServlet {

    @EJB
    private DataBaseWorker dbw;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String login = request.getParameter("login");
            String password = request.getParameter("password");
            if (login != null && password != null) {
                MessageDigest ms = MessageDigest.getInstance("MD5");
                String pepper = "1w5a7c";
                byte[] hash = ms.digest((password+pepper).getBytes(StandardCharsets.UTF_8));
                if (dbw.getUser(login) != null){
                    response.setStatus(401);
                    System.out.println("Юзер с таким логином уже существует");
                    response.getWriter().println("Юзер с таким логином уже существует");
                    return;
                }
                dbw.addUser(new User(login, hash));
                response.setStatus(200);
                System.out.println("Входим");
            } else {
                response.setStatus(406);
                System.out.println("Логин или пароль не соответствуют условию");
                response.getWriter().println("Логин или пароль не соответствуют условию");
            }
        } catch (NoSuchAlgorithmException e){
            System.out.println("Нет такого алгоритма");
        }
    }
}
