<?php
    namespace Framework\Model;

    interface ModelInterface {
        /*
         * This function will return all records in the table
         */ 
        static public function all() : array ;

        /*
         *This function will take in two arrays. The first array will have the fields in 
         * the table that will be returned. The second array will be an associative array
         * that has the fields to search by as well as the values that you are searching
         * for. This is the WHERE part of the query.
         */  
        static public function find(array $columns, array $conditions = [], array $parameters = []) : array ;

        /*
         * This function will insert records into the database table. The parameter is
         * an associative array which has the columns and the values that will be inserted 
         * into tha database. Two foreach statements, one with the kays and the next with the values
         */
        static public function insert(array $data) : bool ; 


        /*
         * This function will take in two associative arrays as the parameters. The first array
         * contains the columns to be updated as well as the new values. The is for the SET
         * part of the query. The second array will have the column and the value for the 
         * conditions.This is for the WHERE portion and it will be a default parameter of an empty
         * array. 
         */
        static public function update(array $data, array $conditions = []) : bool ;

        /*
         * This functions allows the user to delete records from the table. It takes in an
         * associative array which has the fields and their values for the records that will be
         * deleted
         */
        static public function delete(array $conditions) : bool ;

        /*
         * This function will allow the user to add a column to the table. It takes in an associative
         * array with the name of the column as the key and the data type as the value. 
         */
        static public function addMany(array $columns) : bool ;

        /*
         * This functions allows the user to delete one column from the table. It takes
         * in a string which has the column name to be deleted as its parameter.
         */
        static public function deleteColumn(string $column) : bool ;
    }
?>