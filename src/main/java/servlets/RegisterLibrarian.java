/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.JsonObject;
import database.tables.EditLibrarianTable;
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
import mainClasses.JSON_Converter;
import mainClasses.Librarian;

/**
 *
 * @author johna
 */
@WebServlet(name = "RegisterLibrarian", urlPatterns = {"/RegisterLibrarian"})
public class RegisterLibrarian extends HttpServlet {

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
            out.println("<title>Servlet RegisterLibrarian</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet RegisterLibrarian at " + request.getContextPath() + "</h1>");
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
        processRequest(request, response);
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

        String userjson;
        JSON_Converter jc = new JSON_Converter();
        userjson = jc.getJSONFromAjax(request.getReader()); //string

        EditStudentsTable eut = new EditStudentsTable();
        EditLibrarianTable eul = new EditLibrarianTable();

        Librarian p = eul.jsonToLibrarian(userjson); //student object

        try {
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            if (eut.databaseStudentCheckerL(p.getUsername(), p.getEmail()) != null || (eul.databaseToLibrarianChecker(p.getUsername(), p.getEmail()) != null)) {
                response.setStatus(403);
                JsonObject jo = new JsonObject();
                jo.addProperty("error", " Username Already Taken");
                out.write(jo.toString());
            } else {
                eul.addLibrarianFromJSON(userjson);
                response.setStatus(200);
                out.write(userjson);
            }

        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(RegisterStudent.class.getName()).log(Level.SEVERE, null, ex);
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
