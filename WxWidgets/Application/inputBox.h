
#ifndef INPUTBOX_H
#define INPUTBOX_H

#include<iostream>
#include <string>
#include "struct.h"



//-----------------------------------------------------------------------------------------
// Record structure to capture the data from the dialog box
//-----------------------------------------------------------------------------------------

struct student
    {
        int ID;
        wxString	name;
        wxString	surname;
        wxString	major;
        float         gpa;
    }; 
 typedef struct student studentRec; 
  

    
    
  
//Define a dialog box class with the 4 data fields (Attributes) - inheriting from wxDialog, of course 
class InputRecords: public wxDialog
{
    public:
            InputRecords(const wxString& title, const wxPoint& pos, const wxSize& size);
                
            wxSpinCtrl* IDEditBox;
            wxTextCtrl* NameEditBox;
            wxTextCtrl* SurnameEditBox;
            wxComboBox* MajorCombo;
            wxSpinCtrlDouble* GPAEditBox;
            

};

    
    
    
    
    
//-----------------------------------------------------------------------------------------
// The constructor function for the InputRecords class - this is where it all happens
//-----------------------------------------------------------------------------------------
InputRecords::InputRecords ( const wxString& title, const wxPoint& pos, 
                        const wxSize& size): wxDialog((wxDialog *)NULL, -1, title, pos, size)
    {
      
        //The new new panel for the InputRecords box
        wxPanel    *panel = new wxPanel(this, -1);
 
        
        
        //------------------------------------------------------------------------------------------
        //Define and position the StaticTexts - the labels
        //------------------------------------------------------------------------------------------
        
        wxStaticText *IDLabel 	  = new wxStaticText(panel, wxID_ANY, wxT(" ID:"), 
                                                     wxPoint(40, 20) );
        
        wxStaticText *nameLabel   = new wxStaticText(panel, wxID_ANY, wxT(" First Name:"), 
                                                     wxPoint(140, 20));
        
        wxStaticText *surnameLabel = new wxStaticText(panel, wxID_ANY, wxT(" Last Name:"), 
                                                     wxPoint(267, 20) );
        wxStaticText *majorLabel   = new wxStaticText(panel, wxID_ANY, wxT(" Major:"), 
                                                     wxPoint(410, 20) );
        
        wxStaticText *GPALabel   = new wxStaticText(panel, wxID_ANY, wxT(" GPA:"), 
                                                     wxPoint(500, 20) );

        
        

        //------------------------------------------------------------------------------------------
        //Define and position the Data Boxes
        //------------------------------------------------------------------------------------------
        IDEditBox  =  new wxSpinCtrl(panel, wxID_ANY, wxT("20049000"), wxPoint(40, 25), 
                                          wxSize(90, 65), wxSP_ARROW_KEYS, 20049000, 20060000, 1);

        NameEditBox =  new wxTextCtrl ( panel, wxID_ANY, wxT("Enter First Name"), 
                                            wxPoint(140, 43), wxSize(120, -1) );
        
        SurnameEditBox =  new wxTextCtrl ( panel, wxID_ANY, wxT("Enter Surname"), 
                                            wxPoint(267, 43), wxSize(135, -1) );

        GPAEditBox  =  new wxSpinCtrlDouble(panel, wxID_ANY, wxT("4.0"), wxPoint(500, 10), 
                                          wxSize(53, 95), wxSP_ARROW_KEYS,0.1,4.0,4.0,0.01);
        
        //------------------------------------------------------------------------------------------
        //Define and position the Status drop-down list
        //------------------------------------------------------------------------------------------
        // First, store list values in an array (e.g. “status” is the array)
        wxArrayString major;
            major.Add(wxT("COMP"));
            major.Add(wxT("IT"));
            major.Add(wxT("PHYS"));
            major.Add(wxT("ELEC"));
            major.Add(wxT("MATH"));

        //Now, define and position a drop-down combo list:
        MajorCombo = new wxComboBox(panel, -1, wxT("COMP"), wxPoint(410, 44.5),
                                     wxSize(80, 28.5), major, wxCB_READONLY);
 
        
/*
        
        //------------------------------------------------------------------------------------------
        //Define and position the card drop-down list
        //------------------------------------------------------------------------------------------
        // First, store list values in an array (e.g. “status” is the array)
        wxArrayString card;
            card.Add(wxT("Visa"));
            card.Add(wxT("Master Card"));
            card.Add(wxT("American Express"));
            card.Add(wxT("Debit Card"));

        //Now, define and position a drop-down combo list:
        CardCombo = new wxComboBox(panel, -1, wxT("American Express"), wxPoint(300, 65),
                                     wxSize(170, -1), card, wxCB_READONLY);
        
        
        */


        //------------------------------------------------------------------------------------------
        // Define and position the Response buttons (OK and CANCEL)
        //------------------------------------------------------------------------------------------
    
        // The OK button
        wxButton* ok = new wxButton(panel, wxID_OK, wxT("&OK"), wxPoint(190, 115), 
                                    wxDefaultSize, 0);

        // The CANCEL button
        wxButton* cancel = new wxButton ( panel, wxID_CANCEL, wxT("&CANCEL"), 
                                          wxPoint(310, 115), wxDefaultSize, 0 );
    
        // Centre the dialog on the parent's window
        Centre();

        // Maximize(); // Maximize the window
    
        
        
        
        
  }
  
  
class DeleteRecords: public wxDialog
{
    public:
        DeleteRecords(const wxString& title, const wxPoint& pos, const wxSize& size);
        
        wxSpinCtrl* IDEditBox;
};


DeleteRecords::DeleteRecords( const wxString& title, const wxPoint& pos, 
                        const wxSize& size): wxDialog((wxDialog *)NULL, -1, title, pos, size)
{
    
        //The new new panel for the DeleteRecords box
        wxPanel    *panel = new wxPanel(this, -1);
        
        
        //------------------------------------------------------------------------------------------
        //Define and position the StaticTexts - the labels
        //------------------------------------------------------------------------------------------
        
        wxStaticText *instructions = new wxStaticText(panel, wxID_ANY, wxT("Please enter student ID number"),
                                                      wxPoint(40,20) );
        
        wxStaticText *IDLabel 	  = new wxStaticText(panel, wxID_ANY, wxT(" ID:"), 
                                                     wxPoint(75, 45) );
        
        
        
        //------------------------------------------------------------------------------------------
        //Define and position the Data Boxes
        //------------------------------------------------------------------------------------------
        IDEditBox  =  new wxSpinCtrl(panel, wxID_ANY, wxT("20049000"), wxPoint(105, 25), 
                                          wxSize(90, 65), wxSP_ARROW_KEYS, 20049000, 20060000, 1);
        
        
        
           // The OK button
        wxButton* ok = new wxButton(panel, wxID_OK, wxT("&OK"), wxPoint(40, 95), 
                                    wxDefaultSize, 0);

        // The CANCEL button
        wxButton* cancel = new wxButton ( panel, wxID_CANCEL, wxT("&CANCEL"), 
                                          wxPoint(170, 95), wxDefaultSize, 0 );
    
        // Centre the dialog on the parent's window
        Centre();

    
    
}
                            
                            
                        


 
  
  

//-----------------------------------------------------------------------------------------
// We can also grab the data from the InputRecords box and send it back as a string
//-----------------------------------------------------------------------------------------

wxString getDataString(wxRecord newRec)
    {
        wxString str = wxT("\n\n");
        
        wxString idNo;
        idNo << newRec.ID;
        
        wxString grade;
        grade << newRec.gpa;
        
        str.Append(idNo);
        str.Append(wxT("\t") );
        str.Append(newRec.name);
        str.Append(wxT("\t"));
        str.Append(newRec.surname);
        str.Append(wxT("\t"));
        str.Append(newRec.major);
        str.Append(wxT("\t"));
        str.Append(grade);
        str.Append(wxT("\n"));
        
        
        return str;
    }







#endif
