package Servlets;

import Beans.MainPageBean;

import javax.ejb.EJB;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "ClearServlet", value = "/ClearServlet", urlPatterns = "/clear")
public class ClearServlet extends HttpServlet {

    @EJB
    MainPageBean mpb;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String login = request.getParameter("login");
        System.out.println("Проверка");
        mpb.setLogin(login);
        mpb.clearTable();
        response.setStatus(200);
        response.getWriter().println(mpb.getPointList());
    }
}
