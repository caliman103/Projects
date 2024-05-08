


                                //==========================Command: g++ JamaineProject2.cpp -o app-02 `wx-config --libs --cxxflags`======================================================
                                
                                
#include <wx/wxprec.h>
 
#ifndef WX_PRECOMP
  # include <wx/wx.h>
  # include <wx/spinctrl.h>
#endif             

#include <iostream> 
#include <fstream> 
#include <string>

//#include "wxStruct.h"
#include "struct.h"
#include "set2.h"
#include "BST.h"
#include "AVLTree.h"
#include "RBTree.h"
#include "splayTree.h"

#include "inputBox.h"



using namespace std;


/****************************
*****************************
  Step 2: Name an inherited application class from wxApp and declare it with 
	  the function to execute the program				    
*****************************
*****************************/
class Project2App: public wxApp
  {
	 virtual bool OnInit();
  };
  
  
  /****************************
*****************************
   Step 3: Declare the inherited main frame class from wxFrame. In this class 
	   also will ALL the events handlers be declared    
*****************************
*****************************/
class MyFrame: public wxFrame
{
    private:
        DECLARE_EVENT_TABLE() //To declare event items
        
        
        //Structures variable
        Record ADTRecords;
        fileRecord studentDataRecords;
        wxRecord userRecords;
        
        //Variable all the functions will have access to 
        string recordsFromRAF = ""; // holds the records from the binary file
       // int IDofRecord;             // holds the ID if the record to be deleted
        
        //variable to read from file
        fstream datafile;
         
        //variables for BST functions
        BST* bst = new BST();
         
        //variables for AVL functions
        AVL* avl = new AVL(); 
         
        //variables for RB functions
        RBT* rbt = new RBT();
         
         
        //variables for Splay functions
         SplayTree *splay = new SplayTree();
         
        //variables for  heap functions
         
         
        //Variables for set functions
        SetADT setA;
        SetADT setB;
        SetADT unionSet;
        SetADT intersectionSet;
        
        SetADT *ptrSetA;
        SetADT *ptrSetB;
    
        
    public:
        MyFrame (const wxString& title, const wxPoint& pos,
                 const wxSize& size);
        
        //Function for File Menu Items
        void OnOpen      (wxCommandEvent& event);
        void OnSave      (wxCommandEvent& event);
        void OnSaveAs    (wxCommandEvent& event);	
		void OnExit      (wxCommandEvent& event); 
        
        //Functions for the Display item
        void OnDisplay (wxCommandEvent& event);
        
        //Functions for the BST items
        void OnAddDataBST      (wxCommandEvent& event);
        void OnDeleteDataBST   (wxCommandEvent& event);
        void OnInorderBST      (wxCommandEvent& event);
        void OnPreorderBST     (wxCommandEvent& event);
        void OnPostorderBST    (wxCommandEvent& event);
        
        //Functions for AVL tree items
        void OnAddDataAVL     (wxCommandEvent& event);
        void OnDeleteDataAVL  (wxCommandEvent& event);
        void OnInorderAVL     (wxCommandEvent& event);
        void OnPreorderAVL    (wxCommandEvent& event);
        void OnPostorderAVL   (wxCommandEvent& event);
        
        //Functions for RB tree items
        void OnAddDataRB      (wxCommandEvent& event);
        void OnDeleteDataRB   (wxCommandEvent& event);
        void OnInorderRB      (wxCommandEvent& event);
        void OnPreorderRB     (wxCommandEvent& event);
        void OnPostorderRB    (wxCommandEvent& event);
        
        //Functions for the Splay items
        void OnAddDataSplay    (wxCommandEvent& event);
        void OnDeleteDataSplay (wxCommandEvent& event);
        void OnInorderSplay    (wxCommandEvent& event);
        void OnPreorderSPlay   (wxCommandEvent& event);
        void OnPostorderSplay  (wxCommandEvent& event);
        
        //Functions for heap items
        void OnAddDataHeap      (wxCommandEvent& event);
        void OnDeleteDataHeap   (wxCommandEvent& event);
        void OnDisplayHeap      (wxCommandEvent& event);
        void OnHeapSort         (wxCommandEvent& event);
        
        //Functions for the set items
        void OnAddDataSet              (wxCommandEvent& WXUNUSED(event) );
        void OnDisplaySetA             (wxCommandEvent& event);
        void OnDisplaySetB             (wxCommandEvent& event);
        void OnDisplaySetIntersection  (wxCommandEvent& event);
        void OnDisplaySetUnion         (wxCommandEvent& event);
        void OnDeleteFromSetA          (wxCommandEvent& event);
        void OnDeleteFromSetB          (wxCommandEvent& event);
        
        //Functions for Help menu items
        void OnAbout (wxCommandEvent& event);
        void OnExitHelp (wxCommandEvent& event);
        
        
        //Public attributes
        wxTextCtrl* MainEditBox;
        wxTextCtrl* filenameTextBox;
        wxString filePath;    //This is the path to the file that will be opened
        
        
        
};


/****************************
*****************************
  Step 4. Declare the compiler directives				    
*****************************
*****************************/
DECLARE_APP(Project2App)		// Declare Application class
IMPLEMENT_APP(Project2App)		// Create Application class object


enum
{
    //File menu items
    ID_Open = wxID_HIGHEST + 1, //Ensures the added ID's area are unique
    ID_Save,
    ID_SaveAs,
    ID_Exit,
    
    //Display menu items
    ID_Display,
    
    //BST menu items
    ID_AddDataBST,
    ID_DeleleDataBST,
    ID_InorderBST,
    ID_PreorderBST,
    ID_PostorderBST,
    
    //AVL tree menu items
    ID_AddDataAVL,
    ID_DeleleDataAVL,
    ID_InorderAVL,
    ID_PreorderAVL,
    ID_PostorderAVL,
    
    //RB tree menu items
    ID_AddDataRB,
    ID_DeleleDataRB,
    ID_InorderRB,
    ID_PreorderRB,
    ID_PostorderRB,
    
    //Splay manu items
    ID_AddDataSplay,
    ID_DeleleDataSplay,
    ID_InorderSplay,
    ID_PreorderSplay,
    ID_PostorderSplay,
    
    //Heap menu items
    ID_AddDataHeap,
    ID_DeleleDataHeap,
    ID_DisplayHeap,
    ID_HeapSort,
    
    //Set menu items
    ID_AddDataSet,
    ID_DisplaySetA,
    ID_DisplaySetB,
    ID_DisplaySetIntersection,
    ID_DisplaySetUnion,
    ID_DeleteFromSetA,
    ID_DeleteFromSetB,
    
    //Help menu items
    ID_About,
    ID_ExitHelp
};


BEGIN_EVENT_TABLE ( MyFrame, wxFrame )
    //Events for the File menu items
    EVT_MENU ( ID_Open,     MyFrame::OnOpen )  //File Menu 
    EVT_MENU ( ID_Save,     MyFrame::OnSave )
    EVT_MENU ( ID_SaveAs,   MyFrame::OnSaveAs )
    EVT_MENU ( ID_Exit,     MyFrame::OnExit )

    //Events for the Display menu item
     EVT_MENU ( ID_Display,     MyFrame::OnDisplay )
     
    //Events for BST menu items
    EVT_MENU ( ID_AddDataBST, MyFrame::OnAddDataBST )
    EVT_MENU ( ID_DeleleDataBST, MyFrame::OnDeleteDataBST )
    EVT_MENU ( ID_InorderBST, MyFrame::OnInorderBST )
    EVT_MENU ( ID_PreorderBST, MyFrame::OnPreorderBST )
    EVT_MENU ( ID_PostorderBST, MyFrame::OnPostorderBST )
    
    //Functions for AVL tree items
    EVT_MENU ( ID_AddDataAVL, MyFrame::OnAddDataAVL )
    EVT_MENU ( ID_DeleleDataAVL, MyFrame::OnDeleteDataAVL )
    EVT_MENU ( ID_InorderAVL, MyFrame::OnInorderAVL )
    EVT_MENU ( ID_PreorderAVL, MyFrame::OnPreorderAVL )
    EVT_MENU ( ID_PostorderAVL, MyFrame::OnPostorderAVL )

    //Functions for RB tree items
    EVT_MENU ( ID_AddDataRB, MyFrame::OnAddDataRB )
    EVT_MENU ( ID_DeleleDataRB, MyFrame::OnDeleteDataRB )
    EVT_MENU ( ID_InorderRB, MyFrame::OnInorderRB )
    EVT_MENU ( ID_PreorderRB, MyFrame::OnPreorderRB )
    EVT_MENU ( ID_PostorderRB, MyFrame::OnPostorderRB )
    
    //Functions for Splay items
    EVT_MENU ( ID_AddDataSplay, MyFrame::OnAddDataSplay )
    EVT_MENU ( ID_DeleleDataSplay, MyFrame::OnDeleteDataSplay )
    EVT_MENU ( ID_InorderSplay, MyFrame::OnInorderSplay )
    EVT_MENU ( ID_PreorderSplay, MyFrame::OnPreorderSPlay )
    EVT_MENU ( ID_PostorderSplay, MyFrame::OnPostorderSplay )
    
    //Functions for Heap  items
    EVT_MENU ( ID_AddDataHeap, MyFrame::OnAddDataHeap )
    EVT_MENU ( ID_DeleleDataAVL, MyFrame::OnDeleteDataHeap )
    EVT_MENU ( ID_DisplayHeap, MyFrame::OnDisplayHeap )
    EVT_MENU ( ID_HeapSort, MyFrame::OnHeapSort )
  
    
    //Functions for Set items
    EVT_MENU ( ID_AddDataSet, MyFrame::OnAddDataSet )
    EVT_MENU ( ID_DisplaySetA, MyFrame::OnDisplaySetA )
    EVT_MENU ( ID_DisplaySetB, MyFrame::OnDisplaySetB )
    EVT_MENU ( ID_DisplaySetIntersection, MyFrame::OnDisplaySetIntersection )
    EVT_MENU ( ID_DisplaySetUnion, MyFrame::OnDisplaySetUnion )
    EVT_MENU ( ID_DeleteFromSetA, MyFrame::OnDeleteFromSetA )
    EVT_MENU ( ID_DeleteFromSetB, MyFrame::OnDeleteFromSetB )
    
    //Functions for AVL tree items
    EVT_MENU ( ID_About, MyFrame::OnAbout )
    EVT_MENU ( ID_ExitHelp, MyFrame::OnExitHelp )
   
    
    
END_EVENT_TABLE ()
    
    


/****************************
*****************************
  Step 5.  Define the Application class function to initialize the application
*****************************
*****************************/
bool Project2App::OnInit()
  {
      // Create the main application window
      MyFrame *frame = new MyFrame( wxT("COMP2611 – Data Structures Project #2"), 
                    wxPoint(50,50), 
                    wxSize(800,600) );

      // Display the window
      frame->Show(TRUE);
    
      SetTopWindow(frame);

      return TRUE;

  }
  
  
  
/****************************
*****************************
  Step 6:   Define the Constructor functions for the Frame class
*****************************
*****************************/
MyFrame::MyFrame ( const wxString& title, const wxPoint& pos, const wxSize& size)
            : wxFrame((wxFrame *)NULL, -1, title, pos, size)
  {
    // Set the frame icon - optional
    SetIcon(wxIcon(wxT("uwiIcon.xpm")));
  
    
    //Create the main-menu items
    wxMenu *menuFile        =   new wxMenu;
    wxMenu *menuDisplay     =   new wxMenu;
    wxMenu *menuBST         =   new wxMenu;
    wxMenu *menuAVL         =   new wxMenu;
    wxMenu *menuRB          =   new wxMenu;
    wxMenu *menuSplay       =   new wxMenu;
    wxMenu *menuHeap        =   new wxMenu;
    wxMenu *menuSet         =   new wxMenu;
    wxMenu *menuHelp        =   new wxMenu;

    //Create a Main menu bar
    wxMenuBar *menuBar = new wxMenuBar;
    
    //Append the main menu items to the menu bar
    menuBar->Append( menuFile    , wxT("File") );
    menuBar->Append( menuDisplay , wxT("Display") );
    menuBar->Append( menuBST     , wxT("BST") );
    menuBar->Append( menuAVL     , wxT("AVL tree") );
    menuBar->Append( menuRB      , wxT("RB tree") );
    menuBar->Append( menuSplay   , wxT("Splay Tree") );
    menuBar->Append( menuHeap    , wxT("Heap") );
    menuBar->Append( menuSet     , wxT("Set") );
    menuBar->Append( menuHelp    , wxT("Help") );
    
    
    //Append the sub-menu items to the File main manu item
    menuFile->Append( ID_Open, wxT("&Open"),   wxT("Open an Existing file"  ) );
    menuFile->Append( ID_Save, wxT("&Save"),       wxT("Save opened file"  ) );
    menuFile->Append( ID_SaveAs, wxT("&Save As"), wxT("Save displayed file as a new file"  ) );
    menuFile->Append( ID_Exit,  wxT("&Exit"),      wxT("Close and EXIT Program ") );
    
    //Append the sub-menu items to the Display menu item
    menuDisplay->Append( ID_Display, wxT("&Display File"),   wxT("Display the contens of file"  ) );
    
    //Append the sub-menu items to the BST main manu item
    menuBST->Append( ID_AddDataBST, wxT("&Add Data"),   wxT("Add a record to BST" ) );
    menuBST->Append( ID_DeleleDataBST, wxT("&Delete Data"),       wxT("Delete a record from BST" ) );
    menuBST->Append( ID_InorderBST, wxT("&Inorder"), wxT("Display BST using inorder " ) );
    menuBST->Append( ID_PreorderBST,  wxT("&Preorder"),      wxT("Display BST using preorder" ) );
    menuBST->Append( ID_PostorderBST,  wxT("&Postorder"),      wxT("Display BST using postoder" ) );
    
    //Append the sub-menu items to the AVL main manu item
    menuAVL->Append( ID_AddDataAVL, wxT("&Add Data"),       wxT ("Add a record to AVL tree" ) );
    menuAVL->Append( ID_DeleleDataAVL, wxT("&Delete Data"), wxT ("Delete a record from AVL tree" ) );
    menuAVL->Append( ID_InorderAVL, wxT("&Inorder"),        wxT ("Display AVL using inorder " ) );
    menuAVL->Append( ID_PreorderAVL,  wxT("&Preorder"),     wxT ("Display AVL tree using preorder" ) );
    menuAVL->Append( ID_PostorderAVL,  wxT("&Postorder"),   wxT ("Display AVL tree using postoder" ) );
    
    //Append the sub-menu items to the RB main manu item
    menuRB->Append( ID_AddDataRB, wxT("&Add Data"),   wxT("Add a record to RB tree" ) );
    menuRB->Append( ID_DeleleDataRB, wxT("&Delete Data"),  wxT("Delete a record from RB tree" ) );
    menuRB->Append( ID_InorderRB, wxT("&Inorder"), wxT("Display RB using inorder " ) );
    menuRB->Append( ID_PreorderRB,  wxT("&Preorder"),      wxT("Display RB tree using preorder" ) );
    menuRB->Append( ID_PostorderRB,  wxT("&Postorder"),      wxT("Display RN tree using postoder" ) );
    
    //Append the sub-menu items to the Splay main manu item
    menuSplay->Append( ID_AddDataSplay, wxT("&Add Data"),       wxT ("Add a record to Splay tree" ) );
    menuSplay->Append( ID_DeleleDataSplay, wxT("&Delete Data"), wxT ("Delete a record from Splay tree" ) );
    menuSplay->Append( ID_InorderSplay, wxT("&Inorder"),        wxT ("Display Splay using inorder " ) );
    menuSplay->Append( ID_PreorderSplay,  wxT("&Preorder"),     wxT ("Display Splay tree using preorder" ) );
    menuSplay->Append( ID_PostorderSplay,  wxT("&Postorder"),   wxT ("Display Splay tree using postoder" ) );
    
    //Append the sub-menu items to the Heap main manu item
    menuHeap->Append( ID_AddDataHeap, wxT("&Add Data"),       wxT ("Add a record to Splay tree" ) );
    menuHeap->Append( ID_DeleleDataHeap, wxT("&Delete Data"), wxT ("Delete a record from Splay tree" ) );
    menuHeap->Append( ID_DisplayHeap, wxT("&Display All"),        wxT ("Display all records of Heap " ) );
    menuHeap->Append( ID_HeapSort,  wxT("&Heap Sort"),     wxT ("Sort the Heap" ) );
   
    //Append the sub-menu items to the Set main manu item
    menuSet->Append( ID_AddDataSet, wxT("&Add Data"),       wxT ("Add a record to Set" ) );
    menuSet->Append( ID_DisplaySetA, wxT("&Display SetA"), wxT ("Display records in Set A" ) );
    menuSet->Append( ID_DisplaySetB, wxT("&Display SetB"),        wxT ("Display records in Set B " ) );
    menuSet->Append( ID_DisplaySetIntersection,  wxT("&Dislay Intersection"),  wxT ("Display the intersection of SetA and SetB" ) );
    menuSet->Append( ID_DisplaySetUnion,  wxT("&Display Union"),   wxT ("Display the union of SetA and SetB" ) );
    menuSet->Append( ID_DeleteFromSetA,  wxT("&Delete From SetA"),     wxT ("Delete a record from SetAr" ) );
    menuSet->Append( ID_DeleteFromSetB,  wxT("&Delete From SetB"),   wxT ("Delete a record from SetB" ) );
    
    //Append the sub-menu items to the Help main manu item
    menuHelp->Append( ID_About, wxT("&About"),   wxT ("Display information about the applicaion" ) );
    menuHelp->Append( ID_ExitHelp, wxT("&Exit"), wxT ("Close and EXIT Program " ) );
    
    
    
    // ... and now... attach this main menu bar to the frame
    SetMenuBar( menuBar );
    
    
    
    // Create a status bar
    CreateStatusBar(3);
    
    
    //Put something in the first section of the status bar
    SetStatusText( wxT("Ready...") );
    
    //Put something in the Second section of the status bar
    SetStatusText( wxT("Jamaine Drakes"), 1);
    
    //Put something in the Third section of the status bar
    SetStatusText( wxT("400005037" ), 2);
  
    
    
    //Set up the panel for data display

    wxPanel     *panel = new wxPanel(this, -1);
    wxBoxSizer  *vbox  = new wxBoxSizer(wxVERTICAL);        //Vertical sizer for main window
    wxBoxSizer  *hbox1 = new wxBoxSizer(wxHORIZONTAL);      //Horizontal sizer for main window

    //Add two textboxes to the panel for data display
    wxBoxSizer  *hbox2  = new wxBoxSizer(wxHORIZONTAL);     //Horizontal sizer for filename window
    wxBoxSizer  *hbox3  = new wxBoxSizer(wxHORIZONTAL);     //Horizontal sizer for display window
    
    wxStaticText    *fileLabel  = new wxStaticText(panel, wxID_ANY, wxT("File Name"));
    wxStaticText    *displayLabel  = new wxStaticText(panel, wxID_ANY, wxT("Display"));

    //Initialize the filename textbox window
    filenameTextBox = new wxTextCtrl(panel, wxID_ANY, wxT("No File Opened Yet..."));
    
    //Initialize the display window
    MainEditBox = new wxTextCtrl(panel, wxID_ANY, wxT("No file has been opened as yet\n Please use the "
    "\"Open\" sub menu item in \"File\" main menu to open a file of your choice"), 
                    wxPoint(-1, -1), wxSize(-1, -1), wxTE_MULTILINE | wxTE_RICH);
                    

    //Position the labels and textboxes in the panel
    hbox1->Add(fileLabel, 0, wxRIGHT, 8);
    hbox1->Add(filenameTextBox, 1);
    vbox->Add(hbox1, 0, wxEXPAND | wxLEFT | wxRIGHT | wxTOP, 10);

    vbox->Add(-1, 10);
    hbox2->Add(displayLabel, 0);
    vbox->Add(hbox2, 0, wxLEFT | wxTOP, 10);
    vbox->Add(-1, 10);

    hbox3->Add(MainEditBox, 1, wxEXPAND);
    vbox->Add(hbox3, 1, wxLEFT | wxRIGHT | wxEXPAND, 10);

    vbox->Add(-1, 25);
    panel->SetSizer(vbox);

    Centre();

  }
    
    
/****************************
*****************************
  Step 7:  Define member functions for the Frame class
*****************************
*****************************/

//===================================================================================
//=========== Definition for the File Functions =====================================
//===================================================================================

void MyFrame::OnOpen(wxCommandEvent& event )
{
   string grade = "";
    
    //Creates an :open file" dialog with 3 types (dat, txt and All )
    wxFileDialog *OpenDialog = new wxFileDialog ( this,
    (wxT ("Choose file") ), wxEmptyString, wxEmptyString,
        (wxT ("Data files (*.dat)|*.dat|Text files (*.txt)|*txt|All files (*.*)|*.*") ),
            wxFD_OPEN, wxDefaultPosition);

    if (OpenDialog->ShowModal() == wxID_OK) //if the user clicked "Open" and not "Cancel"
    {
        //Sets our current document to the file the user selected
        filePath = OpenDialog->GetPath();
        
        //Clear the filename textbox and display the file name the textbox
        filenameTextBox->Clear();
        filenameTextBox->AppendText(filePath);
        
        //Clear main edit box
        MainEditBox->Clear();
         
        //Set Title
        SetTitle( wxString(wxT("COMP2611 – Data Structures Project #2") ) );
    
        //delets any records in the ADTS
        bst->deleteAll();
        avl->deleteAll();
        rbt->deleteAll();
        splay->deleteAll();
        
        
        setA.deleteAll();
        setB.deleteAll();
        unionSet.deleteAll();
        intersectionSet.deleteAll();
        
        
        //open the binary file to read from it
        datafile.open(filePath.mb_str(wxConvUTF8), ios::in|ios::binary); 
        
        
        
        if(!datafile) //check to see if file was opened
        {
            MainEditBox->AppendText(wxT(  "No file opened as yet.\nPlease use the \"Open\"  option in the File sub menu items") );
            return;
        }
    
        
        while(datafile.read( reinterpret_cast <char*>(&studentDataRecords), sizeof(fileRecord) ) )
        {
            grade = to_string(studentDataRecords.gpa);
            grade.erase(grade.find_last_not_of('0') + 1, std::string::npos);
            
            //Converts the record to a string and append that value to the string vatiable Record
            recordsFromRAF.append(to_string(studentDataRecords.ID) + "\t" + studentDataRecords.name + "\t" + studentDataRecords.surname + "\t" + studentDataRecords.major + "\t" + grade + "\n" );
            
        
            
            bst->insert(bst->convertFromFile(studentDataRecords) );
            avl->insert(avl->convertFromFile(studentDataRecords) );
            rbt->insert(rbt->convertFromFile(studentDataRecords) );
            splay->insert(splay->convertFromFile(studentDataRecords) );
            
            
            setA.addSetA(setA.convertFromFile(studentDataRecords) );
            setB.addSetB(setB.convertFromFile(studentDataRecords) ); 
            
        }
        
        
        ptrSetA = &setA;
        ptrSetB = &setB;
        
        unionSet.Union(ptrSetA, ptrSetB);
        intersectionSet.intersect(ptrSetA, ptrSetB);
        
        
        
        //converts Record into a wx string variable
        wxString wxRecordsFromFile(recordsFromRAF.c_str(), wxConvUTF8);
        
        //Output the wx string variable to the main edit box
        MainEditBox->AppendText(wxRecordsFromFile);
    
    }
    
    
    //close the  binary file that is opened
    datafile.close();
}
  
  
  
void MyFrame::OnSave(wxCommandEvent& event)
{
    //Save to the already-set path for the file
    MainEditBox->SaveFile(filePath);
}
    
void MyFrame::OnSaveAs(wxCommandEvent& event) 
{
    wxFileDialog *SaveDialog = new wxFileDialog (this,
    (wxT ("Save File As") ), wxEmptyString, wxEmptyString,
        (wxT( "Data files (*.dat)|*.dat|Text files (*.txt)|*txt|" )),
       wxFD_SAVE | wxFD_OVERWRITE_PROMPT, wxDefaultPosition);
        
    //Creates a Save Dialog with 4 file types
    if(SaveDialog->ShowModal() == wxID_OK)   //if the user clicked "Open" and not "Cancel"
    {
        //Sets our current document to the file the user selected
        filePath = SaveDialog->GetPath();
        
        // set the path of our current document to the file the user chose to save under
        MainEditBox->SaveFile(filePath); //Save the file to the selected path
        
        
        SetTitle(wxString( wxT("File saved at " + filePath) ) );
        
        
    }
                                            
}

void MyFrame::OnExit(wxCommandEvent& event)
{
    //Display a message box to tell the use good-bye
    wxMessageBox( wxT("Good-bye"), wxT ("Exit"), wxOK | wxICON_INFORMATION, this);
    
    //close the window
    Close(TRUE); 
}


//=====================================================================================
//=========== Definition for the Display Function =====================================
//=====================================================================================
void MyFrame::OnDisplay(wxCommandEvent& event)
{
    
    
    //wxFileDialog *OpenDialog = new wxFileDialog;  
    
    MainEditBox->Clear();

    if(!recordsFromRAF.compare("") )
        MainEditBox->AppendText( wxT ( "No file opened as yet.\nPlease use the \"Open\" "
        " option in the File sub menu items") );
    
        
    
    
   //converts Record into a wx string variable
    wxString wxRecordsFromFile(recordsFromRAF.c_str(), wxConvUTF8);
    
    //Output the wx string variable to the main edit box
    MainEditBox->AppendText(wxRecordsFromFile);
    
    
}


//=====================================================================================
//=========== Definition for the BST Function =========================================
//=====================================================================================
void MyFrame::OnAddDataBST(wxCommandEvent& event)
{
    wxRecord newRec;
    
    
     InputRecords *recordsFromUser = new InputRecords( wxT("Add Student Record"), wxPoint(200,200), wxSize(600,200) );

        
        
        if (recordsFromUser->ShowModal() == wxID_OK )
            {
                wxString celStr = wxT("");
                
                
                //Grab value from the NameBox.
                newRec.ID = recordsFromUser->IDEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.name = recordsFromUser->NameEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.surname = recordsFromUser->SurnameEditBox->GetValue();
                
                //Grab value from the Major Drop-down list
                newRec.major = recordsFromUser->MajorCombo->GetValue();
          
                //Grab value from the NameBox.
                newRec.gpa = recordsFromUser->GPAEditBox->GetValue();
                
            
                MainEditBox->Clear();
                
                MainEditBox->AppendText(getDataString(newRec));
            }
            
         else              //if (recordsFromUser->ShowModal() == wxID_CANCEL)
            recordsFromUser->Close();
            
 
        recordsFromUser->Destroy();			//Destroy the dialog box
}
  
  
void MyFrame::OnDeleteDataBST(wxCommandEvent& event)
{
    
}


void MyFrame::OnInorderBST(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxInorderBST(bst->inOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxInorderBST);
    
}

void MyFrame::OnPreorderBST(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxPreorderBST(bst->preOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPreorderBST);
}


void MyFrame::OnPostorderBST(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxPostorderBST(bst->postOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPostorderBST);
}


//=====================================================================================
//=========== Definition for the AVL Function =========================================
//=====================================================================================
void MyFrame::OnAddDataAVL(wxCommandEvent& event)
{
    wxRecord newRec;
    
    
     InputRecords *recordsFromUser = new InputRecords( wxT("Add Student Record"), wxPoint(200,200), wxSize(600,200) );

        
        
        if (recordsFromUser->ShowModal() == wxID_OK )
            {
                wxString celStr = wxT("");
                
                
                //Grab value from the NameBox.
                newRec.ID = recordsFromUser->IDEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.name = recordsFromUser->NameEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.surname = recordsFromUser->SurnameEditBox->GetValue();
                
                //Grab value from the Major Drop-down list
                newRec.major = recordsFromUser->MajorCombo->GetValue();
          
                //Grab value from the NameBox.
                newRec.gpa = recordsFromUser->GPAEditBox->GetValue();
                
            
                MainEditBox->Clear();
                
                MainEditBox->AppendText(getDataString(newRec));
            }
            
         else              //if (recordsFromUser->ShowModal() == wxID_CANCEL)
            recordsFromUser->Close();
            
 
        recordsFromUser->Destroy();			//Destroy the dialog box
}
  
  
void MyFrame::OnDeleteDataAVL(wxCommandEvent& event)
{
    
}


void MyFrame::OnInorderAVL(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxInorderAVL(avl->inOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxInorderAVL);
}

void MyFrame::OnPreorderAVL(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxPreorderAVL(avl->preOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPreorderAVL);
}


void MyFrame::OnPostorderAVL(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxPostorderAVL(avl->postOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPostorderAVL);
}


//=====================================================================================
//=========== Definition for the RB Function =========================================
//=====================================================================================
void MyFrame::OnAddDataRB(wxCommandEvent& event)
{
    wxRecord newRec;
    
    
     InputRecords *recordsFromUser = new InputRecords( wxT("Add Student Record"), wxPoint(200,200), wxSize(600,200) );

        
        
        if (recordsFromUser->ShowModal() == wxID_OK )
            {
                wxString celStr = wxT("");
                
                
                //Grab value from the NameBox.
                newRec.ID = recordsFromUser->IDEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.name = recordsFromUser->NameEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.surname = recordsFromUser->SurnameEditBox->GetValue();
                
                //Grab value from the Major Drop-down list
                newRec.major = recordsFromUser->MajorCombo->GetValue();
          
                //Grab value from the NameBox.
                newRec.gpa = recordsFromUser->GPAEditBox->GetValue();
                
            
                MainEditBox->Clear();
                
                MainEditBox->AppendText(getDataString(newRec));
            }
            
         else              //if (recordsFromUser->ShowModal() == wxID_CANCEL)
            recordsFromUser->Close();
            
 
        recordsFromUser->Destroy();			//Destroy the dialog box
}
  
  
void MyFrame::OnDeleteDataRB(wxCommandEvent& event)
{
    
}


void MyFrame::OnInorderRB(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxInorderRB(rbt->inOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxInorderRB);
}

void MyFrame::OnPreorderRB(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxPreorderRB(rbt->preOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPreorderRB);
    
}


void MyFrame::OnPostorderRB(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    wxString wxPostorderRB(rbt->postOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPostorderRB);
}



//=====================================================================================
//=========== Definition for the Splay Function =========================================
//=====================================================================================
void MyFrame::OnAddDataSplay(wxCommandEvent& event)
{
    wxRecord newRec;
    
    
     InputRecords *recordsFromUser = new InputRecords( wxT("Add Student Record"), wxPoint(200,200), wxSize(600,200) );

        
        
        if (recordsFromUser->ShowModal() == wxID_OK )
            {
                wxString celStr = wxT("");
                
                
                //Grab value from the NameBox.
                newRec.ID = recordsFromUser->IDEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.name = recordsFromUser->NameEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.surname = recordsFromUser->SurnameEditBox->GetValue();
                
                //Grab value from the Major Drop-down list
                newRec.major = recordsFromUser->MajorCombo->GetValue();
          
                //Grab value from the NameBox.
                newRec.gpa = recordsFromUser->GPAEditBox->GetValue();
                
            
                MainEditBox->Clear();
                
                MainEditBox->AppendText(getDataString(newRec));
            }
            
         else              //if (recordsFromUser->ShowModal() == wxID_CANCEL)
            recordsFromUser->Close();
            
 
        recordsFromUser->Destroy();			//Destroy the dialog box
}
  
  
void MyFrame::OnDeleteDataSplay(wxCommandEvent& event)
{
    
}


void MyFrame::OnInorderSplay(wxCommandEvent& event)
{
     MainEditBox->Clear();
    
    wxString wxInorderSplay(splay->inOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxInorderSplay);
}

void MyFrame::OnPreorderSPlay(wxCommandEvent& event)
{
     MainEditBox->Clear();
    
    wxString wxPreorderSplay(splay->preOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPreorderSplay);
}


void MyFrame::OnPostorderSplay(wxCommandEvent& event)
{
     MainEditBox->Clear();
    
    wxString wxPostorderSplay(splay->postOrder().c_str(), wxConvUTF8);
    
   
    MainEditBox->AppendText(wxPostorderSplay);
}



//=====================================================================================
//=========== Definition for the Heap Function =========================================
//=====================================================================================
void MyFrame::OnAddDataHeap(wxCommandEvent& event)
{
    wxRecord newRec;
    
    
     InputRecords *recordsFromUser = new InputRecords( wxT("Add Student Record"), wxPoint(200,200), wxSize(600,200) );

        
        
        if (recordsFromUser->ShowModal() == wxID_OK )
            {
                wxString celStr = wxT("");
                
                
                //Grab value from the NameBox.
                newRec.ID = recordsFromUser->IDEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.name = recordsFromUser->NameEditBox->GetValue();
                
                //Grab value from the NameBox.
                newRec.surname = recordsFromUser->SurnameEditBox->GetValue();
                
                //Grab value from the Major Drop-down list
                newRec.major = recordsFromUser->MajorCombo->GetValue();
          
                //Grab value from the NameBox.
                newRec.gpa = recordsFromUser->GPAEditBox->GetValue();
                
            
                MainEditBox->Clear();
                
                MainEditBox->AppendText(getDataString(newRec));
            }
            
         else              //if (recordsFromUser->ShowModal() == wxID_CANCEL)
            recordsFromUser->Close();
            
 
        recordsFromUser->Destroy();			//Destroy the dialog box
    
}
  
  
void MyFrame::OnDeleteDataHeap(wxCommandEvent& event)
{
    
}


void MyFrame::OnDisplayHeap(wxCommandEvent& event)
{
    
}

void MyFrame::OnHeapSort(wxCommandEvent& event)
{
    
}


//=====================================================================================
//=========== Definition for the Set Function =========================================
//=====================================================================================
void MyFrame::OnAddDataSet(wxCommandEvent& event)
{
    wxRecord newRec;
    
    
     InputRecords *recordsFromUser = new InputRecords( wxT("Add Student Record"), wxPoint(200,200), wxSize(600,200) );

        
        
    if (recordsFromUser->ShowModal() == wxID_OK )
        {
            wxString celStr = wxT("");
            
            
            //Grab value from the NameBox.
            newRec.ID = recordsFromUser->IDEditBox->GetValue();
            
            //Grab value from the NameBox.
            newRec.name = recordsFromUser->NameEditBox->GetValue();
            
            //Grab value from the NameBox.
            newRec.surname = recordsFromUser->SurnameEditBox->GetValue();
            
            //Grab value from the Major Drop-down list
            newRec.major = recordsFromUser->MajorCombo->GetValue();
        
            //Grab value from the NameBox.
            newRec.gpa = recordsFromUser->GPAEditBox->GetValue();
            
        
            MainEditBox->Clear();
            
            MainEditBox->AppendText(getDataString(newRec));
            
            
            bst->insert(bst->convertFromWX(newRec) );
            avl->insert(avl->convertFromWX(newRec) );
            rbt->insert(rbt->convertFromWX(newRec) );
            splay->insert(splay->convertFromWX(newRec) );
            
            setA.addSetA(setA.convertFromWX(newRec) );
            setB.addSetB(setB.convertFromWX(newRec) );
            
        }
        
        else              //if (recordsFromUser->ShowModal() == wxID_CANCEL)
            recordsFromUser->Close();
        

        recordsFromUser->Destroy();			//Destroy the dialog box   
        
}
  
  
void MyFrame::OnDisplaySetA(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
   
    wxString wxSetA(setA.display() );
    
   
    MainEditBox->AppendText(wxSetA);
} 


void MyFrame::OnDisplaySetB(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
   
    wxString wxSetB(setB.display() );
    
   
    MainEditBox->AppendText(wxSetB);
}

void MyFrame::OnDisplaySetIntersection(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    if(setA.amount() == 0)
         MainEditBox->AppendText( wxT ( "The intersection can not be displayed because no file opened as yet.\nPlease use the \"Open\" " "option in the File sub menu items") );
    else
    {
        
         ptrSetA = &setA;
        ptrSetB = &setB;
    
    
        intersectionSet.intersect(ptrSetA, ptrSetB);
        
        
        wxString wxIntersect(intersectionSet.display().c_str(), wxConvUTF8 );
        
    
        MainEditBox->AppendText(wxIntersect);

    }
}

void MyFrame::OnDisplaySetUnion(wxCommandEvent& event)
{
    MainEditBox->Clear();
    
    ptrSetA = &setA;
    ptrSetB = &setB;
    
    unionSet.Union(ptrSetA, ptrSetB);
    
    
    
    wxString wxUnion(unionSet.display().c_str(), wxConvUTF8 );
    
   
    MainEditBox->AppendText(wxUnion);
}

void MyFrame::OnDeleteFromSetA(wxCommandEvent& event)
{
   
     DeleteRecords *RecordID = new DeleteRecords( wxT("Delete Student Record"), wxPoint(200,200), wxSize(280,180) );
     
     
      if (RecordID->ShowModal() == wxID_OK )
      {
        long deleteID = RecordID->IDEditBox->GetValue();
        setA.removeElem(deleteID);
        setB.removeElem(deleteID );
        bst->remove(deleteID);
        avl->remove(deleteID);
        rbt->remove(deleteID);
        splay->remove(deleteID);
      }
      else 
          RecordID->Close();
      
      
      RecordID->Destroy();
     
}

void MyFrame::OnDeleteFromSetB(wxCommandEvent& event)
{
 
     DeleteRecords *RecordID = new DeleteRecords( wxT("Delete Student Record"), wxPoint(200,200), wxSize(280,180) );
     
     
      if (RecordID->ShowModal() == wxID_OK )
      {
        long deleteID = RecordID->IDEditBox->GetValue();
        setA.removeElem(deleteID);
        setB.removeElem(deleteID);
        bst->remove(deleteID);
        avl->remove(deleteID);
        rbt->remove(deleteID);
        splay->remove(deleteID);
      }
      else 
          RecordID->Close();
      
      
      RecordID->Destroy();  
}

//=====================================================================================
//=========== Definition for the Help Function =========================================
//=====================================================================================
void MyFrame::OnAbout(wxCommandEvent& event)
{
    //Ceeates message box with about information
    wxMessageBox(wxT("This application was created by Jamaine Drakes, a third year student"
    "at the University of the West Indies for Data Structures project 1. The program was"
    "developed in order to create a griphical user interface showcasing some of the functionalities"
   " of vaious linerar ADT's. It was created on a virtural machine using an Opensuse OS"), wxT("About Message Box"), wxOK | wxICON_INFORMATION, this);
}
  
  
void MyFrame::OnExitHelp(wxCommandEvent& event)
{
    //Display a message box to tell the use good-bye
    wxMessageBox( wxT("Good-bye"), wxT ("Exit"), wxOK | wxICON_INFORMATION, this);
    
    //close the window
    Close(TRUE); 
}





