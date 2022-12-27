/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.tables.EditStudentsTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mainClasses.Student;

/**
 *
 * @author johna
 */
@WebServlet(name = "Login", urlPatterns = {"/Login"})
public class Login extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Login</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Login at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        EditStudentsTable eut = new EditStudentsTable();
        if (session.getAttribute("loggedIn") != null) {
            try {
                response.setStatus(200);

                Student p = eut.databaseStudentLogged(session.getAttribute("loggedIn").toString());
                response.getWriter().write(p.getUsername());
            } catch (SQLException | ClassNotFoundException ex) {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            System.out.print("error");
            response.setStatus(403);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
    
       @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String studentjson;
        JSON_Converter jc = new JSON_Converter();
        studentjson = jc.getJSONFromAjax(request.getReader()); //string

        EditStudentsTable eut = new EditStudentsTable();
        EditLibrarianTable eul = new EditLibrarianTable();

        Student p = eut.jsonToStudent(studentjson); //student object

        try {
            Connection con = DB_Connection.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs;
            HttpSession session = request.getSession();
            rs = stmt.executeQuery("SELECT username FROM students WHERE  username = '" + p.getUsername() + "' AND password ='" + p.getPassword() + "'");
            if (rs.next()) {
                session.setAttribute("loggedIn", p.getUsername());
                int activeUsers = 0;
                if (request.getServletContext().getAttribute("activeUsers") != null) {
                    activeUsers = (int) request.getServletContext().getAttribute("activeUsers");
                }
                request.getServletContext().setAttribute("activeUsers", activeUsers + 1);
                response.setStatus(200);
            } else {
                response.setStatus(403);
            }
            System.out.print(studentjson);
            //response.setStatus(200);
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(RegisterStudent.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            EditStudentsTable eut = new EditStudentsTable();
            String username = request.getParameter("username");
            String password = request.getParameter("password");

            HttpSession session = request.getSession(true);
            if (eut.databaseToStudent(username, password) != null) {
                session.setAttribute("loggedIn", username);

                int activeUsers = 0;
                if (request.getServletContext().getAttribute("activeUsers") != null) {
                    activeUsers = (int) request.getServletContext().getAttribute("activeUsers");
                }
                request.getServletContext().setAttribute("activeUsers", activeUsers + 1);
                response.setStatus(200);
            } else {
                response.setStatus(403);
            }
        } catch (SQLException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
