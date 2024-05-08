#ifndef SPLAYTREE_H
#define SPLAYTREE_H

#include <iostream>
#include <string>

#include "struct.h"

using namespace std;

class SplayNode
{
    private:
        Record rec;
        SplayNode *left;
        SplayNode *right;
        
    public:
        //Constructor  functions
        SplayNode() {left = right = 0;}
        SplayNode(Record studentRecord) {rec = studentRecord; left = right = 0;}
        
        //Accessor functions
        SplayNode *getLeft() {return left;}
        SplayNode *getRight() {return right;}
        Record getRecord() {return rec;}
        long getID() {return rec.ID;}
        string getName() {return rec.name;}
        string getSurname() {return rec.surname;}
        string getMajor() {return rec.major;}
        float getGPA() {return rec.gpa;}
        string recAsString (Record);
        
        //Mutator functions
        void setLeft(SplayNode *ptr) {left = ptr;}
        void setRight (SplayNode *ptr) {right = ptr;}
        void setRecord(Record studentRecord) {rec = studentRecord;}
        void setID(long newID) {rec.ID = newID;}
        void setName(string  newName) {rec.name = newName;}
        void setSurname(string newSurname) {rec.surname = newSurname;}
        void setMajor(string newMajor) {rec.major = newMajor;}
        void setGPA(float newGPA) {rec.gpa = newGPA;}
    
};

string SplayNode::recAsString(Record studentRecord)
{
    string student = "";
    string GPA = "";
    
    GPA = to_string(studentRecord.gpa);
    GPA.erase(GPA.find_last_not_of('0') + 1, std::string::npos);
    
    student = to_string(studentRecord.ID) + "\t" + studentRecord.name + "\t" + studentRecord.surname + "\t" + studentRecord.major + "\t" + GPA + "\n";
    
    return student;
    
}



class SplayTree
{
    private:
        SplayNode* root;
        
        //recursive counterpart of insert finction
        SplayNode* insertHelper(SplayNode*, Record);
        
        void deleteHelper(SplayNode*);
        
        //Recursive counterpart of preOrder traversal
        string preOrderHelper(SplayNode*);

        //Recursive counterpart of postOrder traversal
        string postOrderHelper(SplayNode*);

        //Recursive counterpart of inOrder traversal
        string inOrderHelper(SplayNode*);
        
        //Rotate functions
        SplayNode* rightRotate(SplayNode*);
        SplayNode* leftRotate(SplayNode*);
        
        //Splay function
        SplayNode* Splay(SplayNode*,Record);
        
        //private Accessor functions
        SplayNode* findSplayNode(long );
       
        SplayNode* getSuccessor(SplayNode* );
        SplayNode* getParent(SplayNode* );
        SplayNode* getMinimum( SplayNode* );
        
    
    public:   
        //Constructor function
        SplayTree() {root = 0;}
        
        //Accessor functions
        SplayNode* getRoot() {return root;}
        string inOrder(){ return inOrderHelper(root);}
        string preOrder(){ return preOrderHelper(root);}
        string postOrder(){ return postOrderHelper(root);}
        string displayNodes();
        Record convertFromFile(fileRecord);
        Record convertFromWX(wxRecord);
        bool find(long);
        
        //Mutator functions
        void insert(Record);
        void remove(long);
        void deleteAll() {root = 0;}
        
        

    
};

SplayNode* SplayTree::findSplayNode(long IDnumber)
{
    SplayNode *search = root;
    
    while( search  != NULL)
    {
        if(IDnumber == search->getID() )
        {
            return (search);
        }
        if(IDnumber > search->getID() )
        {
            search = search->getRight();
        }
        if(IDnumber < search->getID() )
        {
            search = search->getLeft();
        }
    }
    return NULL;
    
}


bool SplayTree::find(long IDnumber)
{
    SplayNode *search = root;
    
    while(search != NULL )
    {
        if(IDnumber == search->getID() )
        {
            return true;
        }
        if(IDnumber > search->getID() )
        {
            search = search->getRight();
        }
        if(IDnumber < search->getID() )
        {
            search = search->getLeft();
        }
    }
    return false;
    
}


SplayNode* SplayTree::getSuccessor(SplayNode *ptr)
{
    if(ptr->getRight() == NULL)
        return ptr->getLeft();
    else
        return (getMinimum(ptr->getRight()) );
    
    
}


SplayNode* SplayTree::getParent(SplayNode *ptr)
{
    if(ptr == NULL)
        return NULL;
    
    if(ptr == root)
        return NULL;
    
    SplayNode* temp = root;
    
    while(temp != NULL)
    {
        if( (temp->getLeft() == ptr) || (temp->getRight() == ptr) )
            return temp;
        
        else
        {
            if(ptr->getID() > temp->getID() )
                temp = temp->getRight();
            else
                temp = temp->getLeft();
                
        }
        
    }
    return temp;
    
    
}


SplayNode* SplayTree::getMinimum(SplayNode *ptr)
{
    while(ptr->getLeft() != NULL)
        ptr = ptr->getLeft();
    
    return (ptr);
}



Record SplayTree::convertFromFile(fileRecord fileStudent) 
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


Record SplayTree::convertFromWX(wxRecord userStudent)
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



SplayNode* SplayTree::leftRotate(SplayNode *ptr)
{   
    SplayNode *RChild = ptr->getRight();
    
    ptr->setRight(RChild->getLeft() );
    
    RChild->setLeft(ptr);
    
    return RChild;
}


SplayNode* SplayTree::rightRotate(SplayNode *ptr)
{
    SplayNode *LChild = ptr->getLeft();
    
    ptr->setLeft(LChild->getRight() );
    
    LChild->setRight(ptr);
    
    return LChild;
    
}






void SplayTree::insert(Record studentRecord)
{  
    if(studentRecord.major.compare("MATH") == 0)
        root = insertHelper(root, studentRecord);
}


SplayNode* SplayTree::insertHelper(SplayNode *root, Record studentRecord)
{
    SplayNode *newNode = new SplayNode(studentRecord);
    
    if(root == NULL)
        return newNode;
    
    SplayNode *temp = root;
    SplayNode *tempParent = new SplayNode();
    
    while(temp != NULL)
    {
        tempParent = temp;
        
        if(studentRecord.ID > temp->getID() )
            temp = temp->getRight();
        if(studentRecord.ID < temp->getID() )
            temp = temp->getLeft();
        if(studentRecord.ID == temp->getID() )
        {   
            delete newNode;
            return (root);
        }
    }
    
    if(studentRecord.ID > tempParent->getID() )
        tempParent->setRight(newNode);
    else
        tempParent->setLeft(newNode);
    
    root = Splay(root, studentRecord);
    return (root);
}


void SplayTree::remove(long IDnumber)
{
    SplayNode *deleteNode = findSplayNode(IDnumber);
    deleteHelper(deleteNode);
}


void SplayTree::deleteHelper(SplayNode* deleteNode)
{
    if(deleteNode == NULL)
        return;
    
    else
    {
        SplayNode *successor;
        SplayNode *successorChild;
        SplayNode *parent;
        
        if( (deleteNode->getLeft() == NULL) || (deleteNode->getRight() == NULL) )
            successor = deleteNode;
        else
            successor = getSuccessor(deleteNode);
        
        
        successorChild = successor->getRight();
        parent = getParent(successor);
        
        
        // Transfer data from successor to deleteNode
        deleteNode->setRecord(successor->getRecord() );
        
        if( parent == NULL) //successor is root
            root = successorChild;
        else if(successor == parent->getLeft() )
                parent->setLeft(successorChild);
            else
                parent->setRight(successorChild);
            
        if(successor != deleteNode)
            deleteNode->setRecord(successor->getRecord() );
        
        delete successor;
    }
    
}


SplayNode* SplayTree::Splay(SplayNode* root, Record studentRecord)
{
    if(root == NULL)
        return NULL;
    
    SplayNode *header = new SplayNode();
    
    SplayNode *LeftTreeMax = header;
    SplayNode *RightTreeMin = header;
    
    while( (root->getLeft() != NULL) || (root->getRight() != NULL) )
            {
                if(studentRecord.ID < root->getID() )
                    {
                        if(root->getLeft() == NULL)
                            break;
                    
                        if(studentRecord.ID < root->getLeft()->getID())
                            {
                                root = rightRotate(root); 
                                
                                if(root->getLeft() == NULL)
                                    break;
                            }
                       
                        RightTreeMin->setLeft(root);
                        RightTreeMin = RightTreeMin->getLeft();
                        root = root->getLeft();
                        RightTreeMin->setLeft(NULL);
                    }
                else if(studentRecord.ID > root->getID())
                        {
                            if(root->getRight() == NULL)
                                break;
                            if(studentRecord.ID > root->getRight()->getID())
                                {
                                    root = leftRotate(root);
                                    
                                    if(root->getRight() == NULL)
                                        break;
                                }
                            
                            LeftTreeMax->setRight(root);
                            LeftTreeMax = LeftTreeMax->getRight();
                            root = root->getRight();
                            LeftTreeMax->setRight(NULL);
                        }
                    else
                        break;
                }
            LeftTreeMax->setRight(root->getLeft() );
            RightTreeMin->setLeft(root->getRight() );
            root->setLeft(header->getRight() );
            root->setRight(header->getLeft() );
            return root;
    
    
}





string SplayTree::inOrderHelper(SplayNode* ptr)
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




string SplayTree::preOrderHelper(SplayNode* ptr)
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




string SplayTree::postOrderHelper(SplayNode* ptr)
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
