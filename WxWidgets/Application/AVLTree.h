#ifndef AVL_AVLTree_H
#define AVL_AVLTree_H

#include<iostream>
#include<string>


#include "struct.h"


using namespace std;

class AVLNode
{
    private:
        Record rec;
        int height;
        AVLNode* left;
        AVLNode* right;

    public:
        

        // Constructor functions
        AVLNode() {right = left = NULL; height = 0;}
        AVLNode(Record studentRecord) {rec = studentRecord; height = 0; right = left = NULL;}

        
        // Accessor functions
        AVLNode* getLeft() {return left;}
        AVLNode* getRight() {return right;}
        int getHeight() { return height;}
        Record getRecord() {return rec;}
        long getID() {return rec.ID;}
        string getName() {return rec.name;}
        string getSurname() {return rec.surname;}
        string getMajor() {return rec.major;}
        float getGPA() {return rec.gpa;}
        string recAsString (Record);
        
        
        
        // Mutator functions
        void setRecord(Record studentRecord) {rec = studentRecord;}
        void setID(long newID) {rec.ID = newID;}
        void setName(string  newName) {rec.name = newName;}
        void setSurname(string newSurname) {rec.surname = newSurname;}
        void setMajor(string newMajor) {rec.major = newMajor;}
        void setGPA(float newGPA) {rec.gpa = newGPA;}
        void setLeft(AVLNode* ptr) {left = ptr;}
        void setRight (AVLNode* ptr) {right = ptr;}
        void setHeight(int newHeight)  {height = newHeight;}

    
};


string AVLNode::recAsString(Record studentRecord)
{
    string student = "";
    string GPA = "";
    
    GPA = to_string(studentRecord.gpa);
    GPA.erase(GPA.find_last_not_of('0') + 1, std::string::npos);
    
    student = to_string(studentRecord.ID) + "\t" + studentRecord.name + "\t" + studentRecord.surname + "\t" + studentRecord.major + "\t" + GPA + "\n";
    
    return student;
    
}





class AVL
    {
        private:
            AVLNode* root;
    
            //Recursive counterpart for inserting a node
            AVLNode* insertHelper(AVLNode*, Record);       
           
            //Recursive counterpart for deleting a node
            AVLNode* deleteHelper(AVLNode*, long);         
            
            //Recursive counterpart of preOrder traversal
            string preOrderHelper(AVLNode*);

            //Recursive counterpart of postOrder traversal
            string postOrderHelper(AVLNode*);

            //Recursive counterpart of inOrder traversal
            string inOrderHelper(AVLNode*);
            
            //Functions to rotate tree
            AVLNode* rotateRight(AVLNode* );
            AVLNode* rotateLeft(AVLNode* );
            AVLNode* rotateDoubleRight(AVLNode* );
            AVLNode* rotateDoubleLeft(AVLNode* );
            AVLNode* rotateLeftRight(AVLNode* );
            AVLNode* rotateRightLeft(AVLNode* );
            
            //Functions to keep tree balanced
            int calcHeight(AVLNode* );
            int calcBalance(AVLNode* );
        
        public:
            //Constructor function
            AVL() { root = NULL;}
            
            //Accessor functions
            AVLNode* getRoot()       { return root;}
            string   preOrder()      { return preOrderHelper(root); }
            string   postOrder()     { return postOrderHelper(root); }
            string   inOrder()       { return inOrderHelper(root); }
            AVLNode* find(long);
            Record findRecord(long);
            
            //Mutator functions
            Record convertFromFile(fileRecord);
            Record convertFromWX(wxRecord);
            void deleteAll() { root = NULL; }
            void insert(Record); //{ root = insertHelper(root, studentRecord); }
            void remove(long IDnumber) { root = deleteHelper(root, IDnumber); }
            
    };
    
    
void AVL::insert(Record studentRecord) 
{
    if(studentRecord.gpa < 2.0)
        root = insertHelper(root, studentRecord);
}
        


AVLNode* AVL::find(long IDnumber)
{
    AVLNode* search = root;
    
    while( (search->getLeft() != NULL) && (search->getRight() != NULL) ) //until a leaf is reached
    {
        if(IDnumber > search->getID() ) //search the right sub-tree
            search = search->getRight();
        
        if(IDnumber < search->getID() ) //search the left sub-tree
            search = search->getLeft();
        
        if(IDnumber == search->getID() )
        return (search);
        
    }
    return NULL;
    
}

Record AVL::findRecord(long IDnumber)
{
    if(find(IDnumber) != NULL)
    {
        AVLNode* search = root;
        
        if(IDnumber == search->getID() ) //ID found at root
            return search->getRecord();
        else
        {
            while( IDnumber != search->getID() ) //search until the record is found
            {
                if(IDnumber > search->getID() ) //search the right sub-tree
                    search = search->getRight();
                
                if(IDnumber < search->getID() ) //search the left sub-tree
                    search = search->getLeft();
            
                if(IDnumber == search->getID() )
                return search->getRecord();
            }
            
        }
    }
}


Record AVL::convertFromFile(fileRecord fileStudent) 
{
    Record convertedRecord;
    convertedRecord.ID = fileStudent.ID;
    
    string ConvName = fileStudent.name;
    convertedRecord.name = ConvName;
    
    string ConvSurname = fileStudent.surname;
    convertedRecord.surname = ConvSurname;
    
    string ConvMajor = fileStudent.major;
    convertedRecord.major = ConvMajor;
    
    convertedRecord.gpa = fileStudent.gpa;
    
    
    return convertedRecord;
    
}


Record AVL::convertFromWX(wxRecord userStudent)
{
    Record convertedRecord;
    convertedRecord.ID = userStudent.ID;
    
    string ConvName = string(userStudent.name.mb_str() );
    convertedRecord.name = ConvName;
    
    
    string ConvSurname = string(userStudent.surname.mb_str() );
    convertedRecord.surname = ConvSurname;
    
    
    string ConvMajor = string(userStudent.major.mb_str() );
    convertedRecord.major = ConvMajor;
    
    
    convertedRecord.gpa = userStudent.gpa;
    
    return convertedRecord;
}






AVLNode* AVL::insertHelper(AVLNode* ptr, Record studentRecord)
    {
        if ( ptr == NULL )
            {
                ptr = new AVLNode(studentRecord);
            }
        else
            if(studentRecord.ID > ptr->getID() )          // insert in right subtree; OP definition
                {
                    ptr->setRight(insertHelper(ptr->getRight(), studentRecord) );
                    if(calcBalance(ptr) == -2)          // Too heavy on the right
                        {
                            if(studentRecord.ID > ptr->getRight()->getID() )    // Regular right-heavy
                                ptr = rotateDoubleRight(ptr);
                            else                        // It's a special case: ">"
                                ptr = rotateRightLeft(ptr);
                        }
                }
            else
                if( studentRecord.ID < ptr->getID() )
                    {
                        ptr->setLeft(insertHelper(ptr->getLeft(), studentRecord) );
                        if(calcBalance(ptr) == 2)       // Too heavy on the left
                            {
                                if( studentRecord.ID < ptr->getLeft()->getID() )     // Regular left-heavy
                                    ptr = rotateDoubleLeft(ptr);
                                else                    // It's a special case: "<"
                                    ptr = rotateLeftRight(ptr);
                            }
                    }
    
        ptr->setHeight(calcHeight(ptr));
        return ptr;
    }





AVLNode*  AVL::deleteHelper(AVLNode* ptr, long IDnumber)
{
    AVLNode* successor;
    
    if ( ptr == NULL)           // Node location is empty
        return NULL;
        
    else
        if( IDnumber > ptr->getID() )                // Search in Right sub-tree
            {
                ptr->setRight( deleteHelper(ptr->getRight(), IDnumber) );
                if ( calcBalance(ptr) == -2)
                    {
                        if(calcBalance(ptr->getRight() ) >= 0)
                            ptr = rotateDoubleRight(ptr);
                        else
                            ptr = rotateRightLeft(ptr);
                    }
            }
        else
            if( IDnumber < ptr->getID() )          // Search the Left sub-tree
                {
                    ptr->setLeft(deleteHelper(ptr->getLeft(), IDnumber) );
                    if( calcBalance(ptr) == 2 )                   //Rebalance during windup
                        {
                            if( calcBalance(ptr->getLeft() ) <= 0)
                                ptr = rotateDoubleLeft(ptr);
                            else
                                ptr = rotateLeftRight(ptr);
                        }
                }
            else
                {
                    //Node to to be deleted is found
                    if ( ptr->getRight() != NULL)
                        
                        {  //delete its inorder successor
                            successor = ptr->getRight();            //Go right
                            while ( successor->getLeft() != NULL)   //then deep left
                                successor = successor->getLeft();
                            
                            //Transfer data form successor to ptr
                            ptr->setRecord( successor->getRecord() );
                            
                            //reset ptr right child
                            ptr->setRight(deleteHelper( ptr->getRight(), ptr->getID() ) );
                            
                            if(calcBalance(ptr) == 2) // Rebalance during windup
                                {
                                    if(calcBalance(ptr->getLeft() ) >= 0)
                                        ptr = rotateDoubleLeft(ptr);
                                    else
                                        ptr = rotateLeftRight(ptr);
                                }
                    }
                else
                    return (ptr->getLeft() );
                
                }
    ptr->setHeight(calcHeight(ptr));
    return(ptr);
}







AVLNode*  AVL::rotateRight(AVLNode* ptr)
    {
        AVLNode* newParent;
    
        newParent = ptr->getLeft();
        ptr->setLeft( newParent->getRight() );
        newParent->setRight(ptr);
        ptr->setHeight(calcHeight(ptr));
        newParent->setHeight(calcHeight(newParent));
    
        return ( newParent );
    }





AVLNode*  AVL::rotateLeft(AVLNode* ptr)
    {
        AVLNode* newParent;
    
        newParent = ptr->getRight();
        ptr->setRight(newParent->getLeft() );
        newParent->setLeft(ptr);
        ptr->setHeight(calcHeight(ptr));
        newParent->setHeight(calcHeight(newParent));
    
        return ( newParent );
    }





AVLNode*  AVL::rotateDoubleRight(AVLNode* ptr)
    {
        ptr = rotateLeft(ptr);
        return(ptr);
    }





AVLNode*  AVL::rotateDoubleLeft(AVLNode* ptr)
    {
        ptr = rotateRight(ptr);
        return(ptr);
    }





AVLNode*  AVL::rotateLeftRight(AVLNode* ptr)
    {
        ptr->setLeft(rotateLeft(ptr->getLeft() ) );
        ptr = rotateRight(ptr);
        return(ptr);
    }






AVLNode*  AVL::rotateRightLeft(AVLNode* ptr)
    {
        ptr->setRight(rotateRight(ptr->getRight() ) );
        ptr = rotateLeft(ptr);
        return(ptr);
    }





int AVL::calcHeight(AVLNode* ptr)
    {
        int leftHeight, rightHeight;
        
        if( ptr == NULL)
            return(0);
        
        if(ptr->getLeft() == NULL)
            leftHeight = 0;
        else
            leftHeight = 1 + ptr->getLeft()->getHeight();
        
        if(ptr->getRight() == NULL)
            rightHeight = 0;
        else
            rightHeight = 1 + ptr->getRight()->getHeight();

    
        if(leftHeight > rightHeight)
            return(leftHeight);
    
        return(rightHeight);
    }





int AVL::calcBalance(AVLNode* ptr)
    {
        int leftHeight, rightHeight;
    
        if(ptr == NULL)
            return (0);
    
        if(ptr->getLeft() == NULL)
            leftHeight = 0;
        else
            leftHeight = 1 + ptr->getLeft()->getHeight();
    
        if(ptr->getRight() == NULL)
            rightHeight = 0;
        else
            rightHeight = 1 + ptr->getRight()->getHeight();
    
        return(leftHeight - rightHeight);
    }






string AVL::inOrderHelper(AVLNode* ptr)
{
    string display = "";

    if ( ptr != NULL )
    {
        display.append( inOrderHelper(ptr->getLeft()) );
        display.append( ptr->recAsString(ptr->getRecord() ) );
        display.append( inOrderHelper(ptr->getRight()) );
    }
    return display;
}




string AVL::preOrderHelper(AVLNode* ptr)
{
    string display = "";
    
    if( ptr !=  NULL)
    {
        display.append( ptr->recAsString(ptr->getRecord() ) );
        display.append( preOrderHelper(ptr->getLeft() ) ); 
        display.append( preOrderHelper(ptr->getRight()) );
        
    }
    return display;
    
}




string AVL::postOrderHelper(AVLNode* ptr)
{
     string display = "";

    if ( ptr != NULL )
    {
        display.append( postOrderHelper(ptr->getLeft() ) );
        display.append( postOrderHelper(ptr->getRight () ) );
        display.append( ptr->recAsString(ptr->getRecord() ) );
       
    }
    return display;
}




#endif 
