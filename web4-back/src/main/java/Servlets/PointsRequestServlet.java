package Servlets;

import Beans.MainPageBean;
import Entity.Point;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ejb.EJB;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(name = "PointsRequestServlet", value = "/PointsRequestServlet", urlPatterns = "/checker")
public class PointsRequestServlet extends HttpServlet {
    @EJB
    MainPageBean mpb;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String login = request.getParameter("login");
            if (login == null) {
                response.setStatus(401);
                response.getWriter().println("Вы не прошли авторизацию");
                return;
            } else if (login.length() <= 5){
                response.setStatus(401);
                response.getWriter().println("Вы не прошли авторизацию");
                return;
            }

            mpb.setLogin(login);
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));
            if (mpb.addPoint(x, y, r)) {
                ObjectMapper mapper = new ObjectMapper();
                response.setStatus(200);
                response.getWriter().println(mapper.writeValueAsString(mpb.getPointList()));
            }
        } catch (Exception e){
            ObjectMapper mapper = new ObjectMapper();
            response.setStatus(200);
            response.getWriter().println(mapper.writeValueAsString(mpb.getPointList()));
        }
    }

}
