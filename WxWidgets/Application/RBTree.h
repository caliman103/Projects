#ifndef RBTREE_H
#define RBTREE_H

#include<iostream>
#include<string>

#include "struct.h"

using namespace std;

class RBTNode
{
    private:
        Record rec;
        RBTNode* left;
        RBTNode* right;
        RBTNode* parent;
        string colour;
    
        
    public:
        //COnstructor functions
        RBTNode() {right = left = parent = NULL; colour = "RED";}
        RBTNode(Record studentRecord) {rec = studentRecord; right = left = parent = NULL; colour = "RED";}
        
        
        //Accessor functions
        RBTNode* getLeft() {return left;}
        RBTNode* getRight() {return right;}
        RBTNode* getParent() {return parent;}
        Record getRecord() {return rec;}
        long getID() {return rec.ID;}
        string getName() {return rec.name;}
        string getSurname() {return rec.surname;}
        string getMajor() {return rec.major;}
        float getGPA() {return rec.gpa;}
        string getColour() {return colour;}
        string recAsString (Record);
        
        
        //Mutator functions
        void setLeft(RBTNode* ptr) {left = ptr;}
        void setRight (RBTNode* ptr) {right = ptr;}
        void setParent(RBTNode* ptr) {parent = ptr;}
        void setRecord(Record studentRecord) {rec = studentRecord;}
        void setID(long newID) {rec.ID = newID;}
        void setName(string  newName) {rec.name = newName;}
        void setSurname(string newSurname) {rec.surname = newSurname;}
        void setMajor(string newMajor) {rec.major = newMajor;}
        void setGPA(float newGPA) {rec.gpa = newGPA;}
        void setColour(string col) {colour = col;}
        
};

string RBTNode::recAsString(Record studentRecord)
{
    string student = "";
    string GPA = "";
    
    GPA = to_string(studentRecord.gpa);
    GPA.erase(GPA.find_last_not_of('0') + 1, std::string::npos);
    
    student = to_string(studentRecord.ID) + "\t" + studentRecord.name + "\t" + studentRecord.surname + "\t" + studentRecord.major + "\t" + GPA + "\n";
    
    return student;
    
}



class RBT
{
    private:
        RBTNode* root;
        
        //used to delete a node
        void deleteHelper(RBTNode*);
        
        //Recursive counterpart of inOrder traversal
        string  inOrderHelper(RBTNode* );
        
        //Recursive counterpart of preOrder traversal
        string  preOrderHelper(RBTNode* );
        
        //Recursive counterpart of postOrder traversal
        string  postOrderHelper(RBTNode* );
        
        //Functions to rotate tree
        void rotateLeft(RBTNode*);
        void rotateRight(RBTNode*);
        
        void fixUp(RBTNode*);
    
        RBTNode* find(long);
        RBTNode* getMinimum(RBTNode*);
        RBTNode* getSuccessor(RBTNode*);
        
        
    public:
        //Constructor function
        RBT() {root = NULL;}
        
        
        //Accessor functions
        RBTNode* getRoot()  {return root;}
        string inOrder()    {return inOrderHelper(root);}
        string preOrder()   {return preOrderHelper(root);}
        string postOrder()  {return postOrderHelper(root);}
       // string showLevels();
        
        
        //Mutator functions
        Record convertFromFile(fileRecord);
        Record convertFromWX(wxRecord);
        void deleteAll() { root = NULL; }
        void insert(Record);
        void remove(long IDnumber); //{ root = deleteHelper(root, IDnumber); }
    
    
    
};


Record RBT::convertFromFile(fileRecord fileStudent) 
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




Record RBT::convertFromWX(wxRecord userStudent)
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




RBTNode* RBT::find(long IDnumber)
{
    RBTNode* search = root;
    
    while(search != NULL)
    {
        if(IDnumber  == search->getID() ) //node found
            return (search);
        
        if(IDnumber > search->getID() )
            search = search->getRight();
        
        if(IDnumber < search->getID() )
            search = search->getLeft();
    }
    return NULL;                    //node not found
        
}


void RBT::insert(Record studentRecord)
{
    if(studentRecord.gpa > 2.0)
    {
        RBTNode* newNode = new RBTNode(studentRecord);
    
        if(root == NULL)
        {
            newNode->setColour("BLACK");
            root = newNode;
            return;
            
        }
        else
        {
            RBTNode* ancestor = NULL;
            RBTNode* current = root;
            
            while(current != NULL)
            {
                ancestor = current;
                
                if(newNode->getID() > current->getID() )  //go down right sub-tree
                    current = current->getRight();
                
                if(newNode->getID() < current->getID() ) //go down left sub-tree
                        current = current->getLeft();
                
                if(newNode->getID() == current->getID() )
                {
                    delete newNode;
                    return;
                }
                
            }
            
            newNode->setParent(ancestor);
            
            if(newNode->getID() > ancestor->getID() )
                ancestor->setRight(newNode);
            
            else/*if(newNode->getID() < ancestor->getID() ) */
                ancestor->setLeft(newNode);
            
            fixUp(newNode);
            
        }
    }
    
}

void RBT::fixUp(RBTNode* ptr)
{
    RBTNode* Uncle = NULL;
    
    while( (ptr != root) && (ptr->getParent()->getColour() == "RED" ) )
    {
        if(ptr->getParent() == ptr->getParent()->getParent()->getLeft() )
        {
            //ptr's parent is a left child
            Uncle = ptr->getParent()->getParent()->getRight();
            
            if( (Uncle != NULL) && (Uncle->getColour() == "RED" ) )
            {
                ptr->getParent()->setColour("BLACK");
                Uncle->setColour("BLACK");
                ptr->getParent()->getParent()->setColour("RED");
                ptr = ptr->getParent()->getParent();
                
            }
            else
            {
                if(ptr == ptr->getParent()->getRight() )
                {   
                    ptr = ptr->getParent();
                    rotateLeft(ptr);
                }
                
                ptr->getParent()->setColour("BLACK");
                ptr->getParent()->getParent()->setColour("RED");
                rotateRight(ptr->getParent()->getParent() );
                
            }
            
        }
        else
        {
            //ptr's parent is a right child
            Uncle = ptr->getParent()->getParent()->getLeft();
            
            if( (Uncle != NULL) && (Uncle->getColour() == "RED" ) )
            {
                ptr->getParent()->setColour("BLACK");
                Uncle->setColour("BLACK");
                ptr->getParent()->getParent()->setColour("RED");
                ptr = ptr->getParent()->getParent();
                
            }
            else
            {
                if(ptr == ptr->getParent()->getLeft() )
                {
                    ptr = ptr->getParent();
                    rotateRight( ptr);
                    
                }
                ptr->getParent()->setColour("BLACK");
                ptr->getParent()->getParent()->setColour("RED");
                rotateLeft(ptr->getParent()->getParent() );
                
            }
            
            
            
            
        }
        
    }
    root->setColour("BLACK");
    
    Uncle = NULL;
    
}


void RBT::remove(long IDnumber)
{
    RBTNode* deleteNode = find(IDnumber);
    deleteHelper(deleteNode);
}


void RBT::deleteHelper(RBTNode* location)
{
    if(location == NULL)
        return;
    
    else
    {
        RBTNode* successor;
        RBTNode* successorChild;
        successor = location;
        
        if ( (location->getLeft() == NULL) || (location->getRight() == NULL) )//If either of the children is NULL
            successor = location;
        
        else
            successor = getSuccessor(location);
        
        if(successor->getLeft() == NULL) // only has a right child
            successorChild = successor->getRight();
        else
            successorChild = successor->getLeft();
        
        if(successorChild != NULL)
            successorChild->setParent(successor->getParent() );
        
        if(successor->getParent() == NULL)
            root = successorChild;
        else if(successor == successor->getParent()->getLeft() )
            successor->getParent()->setLeft(successorChild);
            else
                successor->getParent()->setRight(successorChild);
            
        if(successor != location)
            location->setRecord(successor->getRecord() );
        
        if( (successorChild != NULL) && (successor->getColour().compare("BLACK") ) ) 
            fixUp(successorChild);

    }
        
}


void RBT::rotateLeft(RBTNode* ptr)
{
    RBTNode* rightChild = ptr->getRight();
    ptr->setRight(rightChild->getLeft() );
    
    if(rightChild->getLeft() != NULL)
        rightChild->getLeft()->setParent(ptr);
    
    rightChild->setParent(ptr->getParent() );
    
    if(ptr == root)
        root = rightChild;
    else
    {
        if(ptr == ptr->getParent()->getLeft() )
            ptr->getParent()->setLeft(rightChild);
        else
            ptr->getParent()->setRight(rightChild);
    }
    rightChild->setLeft(ptr);
    ptr->setParent(rightChild);
}




void RBT::rotateRight(RBTNode* ptr)
{
    RBTNode* leftChild = ptr->getLeft();
    ptr->setLeft(leftChild->getRight() );
    
    if(leftChild->getRight() != NULL)
        leftChild->getRight()->setParent(ptr);
    
    leftChild->setParent(ptr->getParent() );
    
    if(ptr == root)
        root = leftChild;
    else
    {
        if(ptr == ptr->getParent()->getRight() )
            ptr->getParent()->setRight(leftChild);
        else
            ptr->getParent()->setLeft(leftChild);
        
    }
    leftChild->setRight(ptr);
    ptr->setParent(leftChild);
    
}


RBTNode* RBT::getSuccessor(RBTNode *ptr)
{
    if(ptr->getRight() == NULL)
        return ptr->getLeft();
    else
        return (getMinimum(ptr->getRight() ) );
}

RBTNode* RBT::getMinimum(RBTNode *ptr)
{
    while(ptr->getLeft() != NULL)
        ptr = ptr->getLeft();
        
        return (ptr);
}



string RBT::inOrderHelper(RBTNode* ptr)
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




string RBT::preOrderHelper(RBTNode* ptr)
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




string RBT::postOrderHelper(RBTNode* ptr)
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
