/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.DB_Connection;
import database.tables.EditStudentsTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mainClasses.JSON_Converter;
import mainClasses.Student;

/**
 *
 * @author johna
 */
@WebServlet(name = "Settings", urlPatterns = {"/Settings"})
public class Settings extends HttpServlet {

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
            out.println("<title>Servlet Settings</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Settings at " + request.getContextPath() + "</h1>");
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

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String studentjson;
        JSON_Converter jc = new JSON_Converter();
        studentjson = jc.getJSONFromAjax(request.getReader()); //string
        EditStudentsTable eut = new EditStudentsTable();
        Student p = eut.jsonToStudent(studentjson); //student object
        HttpSession session = request.getSession();
        String username = session.getAttribute("loggedIn").toString();

        try {
            Student logged = eut.databaseStudentLogged(username);
            Connection con = DB_Connection.getConnection();
            Statement stmt = con.createStatement();
            if (!p.getPassword().equals("")) {
                String update = "UPDATE students SET password='" + p.getPassword() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }
            if (!p.getFirstname().equals("")) {
                String update = "UPDATE students SET firstname ='" + p.getFirstname() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getLastname().equals("")) {
                String update = "UPDATE students SET lastname ='" + p.getLastname() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getPassword().equals("")) {
                String update = "UPDATE students SET password='" + p.getPassword() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getGender().equals("")) {
                String update = "UPDATE students SET password='" + p.getGender() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getCountry().equals("")) {
                String update = "UPDATE students SET country ='" + p.getCountry() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getCity().equals("")) {
                String update = "UPDATE students SET city ='" + p.getCity() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getTelephone().equals("")) {
                String update = "UPDATE students SET telephone ='" + p.getTelephone() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getAddress().equals("")) {
                String update = "UPDATE students SET address ='" + p.getAddress() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (!p.getPersonalpage().equals("")) {
                String update = "UPDATE students SET personalpage ='" + p.getPersonalpage() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (p.getLat() != null) {
                String update = "UPDATE students SET lat ='" + p.getLat() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }

            if (p.getLon() != null) {
                String update = "UPDATE students SET lon='" + p.getLon() + "' WHERE username = '" + logged.getUsername() + "'";
                stmt.executeUpdate(update);
            }
            response.setStatus(200);
        } catch (SQLException ex) {
            Logger.getLogger(Settings.class.getName()).log(Level.SEVERE, null, ex);
            response.setStatus(409);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Settings.class.getName()).log(Level.SEVERE, null, ex);
            response.setStatus(409);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
