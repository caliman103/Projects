<?php 
    namespace Framework\Model;

    use Framework\Model\ModelInterface;
    use Framework\Traits\ModelHelper;

    class Model implements ModelInterface {
        use ModelHelper;

        public function __construct(){
        }//end constructor
        /*
         * This function simply returns all records from the database. It will be in an
         * associative array
         * Possible format:
         *      all(); 
         */
        static public function all() : array {
            return self::runSelectQuery('SELECT * FROM ' . basename(get_called_class()) . ';');
        }//end getAllRecords

        /*
         * This function will allows user to get records from a table (run a select). This
         * function takes in the columns in a normal array and uses the implode function to
         * add them to the select query. Next it checks to see if any conditions (WHERE part)
         * were passed to the function. If conditions were passsed then the query is updated
         * and each condition is added by using the foreach funtion. The column name,
         * operator, value to be compared with as well as the comparison word will be sent in
         * this second parameter. If no conditions the this section is skipped and the function
         * checks to see if any parameters were passed. If parameters were passed then they are
         * added to the query at the end. however if none were passed then the query is ended 
         * and run.
         * Possible format:
         *     find(
         *          ['name', 'age', 'parish'],
         *          [
         *              ['column' => 'name','operator' => '=', 'value' => 'Jack','follow' => 'AND',],
         *              ['column' => 'age','operator' => '<','value' => 8,'follow' => 'AND',],
         *              ['column' => 'parish','operator' => '=', 'value' => 'St. Lucy','follow' => 'OR',],
         *              ['column' => 'parish','operator' => '=', 'value' => 'St. Joseph','follow' => '',]
         *          ],
         *          ['ORDER BY' => 'name','LIMIT' => 5,'SKIP' => 6,]
         *        );
         */
        static public function find(array $columns, array $conditions = [], array $parameters = []) : array {
            $selectQuery = 'SELECT '. implode(", ", $columns) . ' FROM '. basename(get_called_class()) . ' '; // start query
            if(!empty($conditions)) { //conditions were specified
                if(!self::checkConditions($conditions)) return [];
                $selectQuery = self::addConditions($selectQuery, $conditions);
            }//end if
            if(!empty($parameters)) { //parameters were specified
                foreach($parameters as $parameter => $value) {
                    $selectQuery .= $parameter . " " . $value . ' '; 
                }//end foreach
            }//end if
            $selectQuery .= ';';
            return self::runSelectQuery($selectQuery);
        }//end find()

        static public function findOne(int $id) : object  {
            $selectQuery = 'SELECT * FROM '. basename(get_called_class()) . ' WHERE id = ' . $id .';';
            return self::runSelectQuery($selectQuery)[0]; 
            
        }

        /*
         * This function will be used when only the columns are specified. The function takes in
         * the columns as an array for the parameter, adds them to a select query then runs it. The
         * records that fit the query are returned. This function shoud execute faster than the find()
         * function since there there aren't any conditional checks as seen in that function. As such,
         * this function will be preferred over the find() function when there isn't a need for a complex
         * query.
         * Possible format:
         *      findColumns(['name','age', 'email']);  
         */
        static public function findColumns(array $columns) { 
            return Model::runSelectQuery("SELECT " . implode(", ", $columns) . ' FROM ' . basename(get_called_class()));
        }

        /*
         * This function allows the user to insert one record into the table. It takes in an associative
         * array that has the columns (key) and its associated values (value). It implodes the array and
         * updates the query. The query is runs and returns tru or false depending on its success.
         * Possible format:
         *          insert([
         *              'name' => 'Jack',
         *              'age' => 3,
         *              'email' => 'jackEmail@gmail.com',
         *              'parish' => 'St. Thomas'
         *          ]);
         */
        static function insert(array $data): bool {
            if(empty($data)) {
                return false;
            }//end if
            return self::runQuery('INSERT INTO ' . basename(get_called_class()) .' ' . '(' . implode(", " ,array_keys($data)) . ') VALUES (\'' . implode("', '", $data) . '\');');
            //return true;
        }//end insert()

        /*
         * This function will be used when the user wants to insert multiple records into the database. It
         * takes the columns as the first parameter, and the second parameter will hold the records that will
         * be inserted. The indexes of the columns must map to the index of the records to ensure they are
         * entered correctly.
         * Possible format:
         *          insertMany(
         *              ['name', 'age', 'parish', 'email', 'score',],
         *              [
         *                  ['Macy', 19, 'St. Thomas', 'macy_Email@gmail.com', 78],
         *                  ['Jonah', 24, 'St. Peter', 'dancy_pas@outlook.com', 80],
         *                  ['Gary', 65, 'St. James', 'FaryPantsss@gmail.com', 73],
         *                  ['Noelle', 27, 'Christ Church', 'snowy_light', 97],
         *                  ['Jerry', 19, 'St. Joseph', 'JerryEmail@gmail.com', 79],
         *                  ['Bobby', 43, 'St. James', 'BobbyBoyyyyy@outlook.com', 86],
         *                  ['Frank', 46, 'St. George', 'Frankenstein@gmail.com', 89], 
         *              ]
         *          ); 
         */
        static public function insertMany(array $columns, array $records) : bool {
            if(empty($columns) || empty($records)) { //user did not call the function correctly
                return false;
            }//end if
            $insertQuery = 'INSERT INTO ' . basename(get_called_class()) . '(' . implode(", ", $columns) . ') VALUES ';
            foreach($records as $record) { //update the query appropriately
                $insertQuery .= '(';
                for($i = 0; $i < sizeof($record); $i++) { 
                    isset($record[$i+1]) ?
                    $insertQuery .= '\''. $record[$i].'\', ':
                    $insertQuery .= '\''. $record[$i].'\'), ';   
                }//end for
            }//end foreach
            $insertQuery[strlen($insertQuery)-2] = ';'; // remove the comma at the end and replace with a ;
            return Model::runQuery($insertQuery);
        }//end insertMany() 

        /*
         * This functions allow the user to update one or more columns in the table. The first parameter
         * is an associative array which has the column as the key and the new value as the value. The
         * second parameter is another associative array which has the conditions for updating the table.
         * If conditions were specified, these conditions will be added to the query by using the 
         * addConditions() helper function.
         * Possible format:
         *          update(
         *                  ['parish' => 'Christ Church',],
         *                  [
         *                      ['column' => 'name','operator' => '=', 'value' => 'Jack','follow' => 'OR',],
         *                      ['column' => 'age','operator' => '>','value' => '50','follow' => '',],
         *                  ]
         *              );  
         */
        static public function update(array $data, array $conditions = []) : bool {
            if(empty($data)) {
                return false;
            }//end if
            $updateQuery = 'UPDATE ' . basename(get_called_class()) . ' SET ';
            $last = array_key_last($data);
            foreach($data as $column => $value) {
                $column === $last ?
                $updateQuery .= $column . ' = \'' . $value . '\' ' :
                $updateQuery .= $column . ' = \'' . $value . '\', ';
            }//end foreach
            if(!empty($conditions)) {
                if(!Model::checkConditions($conditions)) return false;
                $updateQuery = Model::addConditions($updateQuery, $conditions);
            }
            // return $this->runQuery($updateQuery);
            return true;
        }//end update()

        /*
         * This fucntion allows the user to delete some records from the table. Conditions must
         * be specified in order for the query that will be generated to execute. The first parameter
         * will hold the conditions for the records to be deleted. The are addeed onto the query by
         * using the addConditions helper function.
         * Possible format:
         *              delete(
         *                  [
         *                      ['column' => 'name','operator' => '=', 'value' => 'Jack','follow' => 'OR',],
         *                      ['column' => 'age','operator' => '>','value' => '50','follow' => '',],
         *                  ]
         *              );
         */
        static public function delete(array $conditions): bool {
            if(empty($conditions)) return false;
            return true;
            //return $this->runQuery('DELETE FROM ' .$this->tableName . $this->addConditions('', $conditions) . ';');
        }//end delete()

        /*
         * This functions deletes all the records form the database. Some verification mechanisms will
         * be in place since this is a dangerous function.
         * Possible format:
         *      deleteAll();
         */
        static public function deleteAll() : bool {
            return true;
            //return $this->runQuery('DELETE FROM ' . $this->tableName . ';');
        }//end deleteAll()

        /*
         * This fuction allows the user to add one column to the table. It takes in the name of the column
         * as the first parameter and the data type in the second parameter. These are added to the query.
         * Next it check to see if any additional information about the column was specified in the third
         * parameter. If none were specified then the query is run, however if there was additional
         * information then that will be added onto the query by using a foreach statement. The function
         * returns true or false depending on the success of the query.
         * Possible format:
         *          add(
         *              'nickname', 
         *              'VARCHAR(50)',
         *              ['NOT NULL', 'AFTER name'],
         *          );
         */
        static public function add(string $column, string $dataType, array $misc = []) : bool {
            $addQuery = 'ALTER TABLE'. basename(get_called_class()) .'ADD COLUMN '. $column . ' ' . $dataType . ' ';
            if(empty($misc)) {
                $addQuery .= ';';
            } else {
                foreach($misc as $extra) {
                    $addQuery .= $extra . ' ';
                }//end foreach
                $addQuery .= ';';
            }//end if-else
            return true;
            //return $this->runQuery($addQuery);
        }//end add()

        /*
         * This functions allows the user to add columns to the table. It takes in an associative array
         * that has the name of the column as the key and its data type as the value. These array elements
         * area added to the query and then it is executed. It returns true or false depending on its success.
         * Possible format:
         *          addMany(
         *              [
         *                  'phone' => 'VARCHAR(50)',
         *                  'budget' => 'INT',
         *                  'pet' => 'VARCHAR(50)',
         *              ]
         *          );
         */
        static public function addMany(array $columns) : bool {
            $addQuery = 'ALTER TABLE ' . basename(get_called_class()) . ' ';
            $last = array_key_last($columns);
            foreach($columns as $column => $dataType) {
                $column === $last ?
                $addQuery .= 'ADD COLUMN '. $column . ' ' . $dataType :
                $addQuery .= 'ADD COLUMN '. $column . ' ' . $dataType . ', ';
            }//end foreach
            $addQuery .= ';';
            return Model::runQuery($addQuery);
        }//end addColumn()

        /*
         * This function is used to delete one column from the table. It takes in that column as a
         * string for the parameter and adds it to a query which is run. The function returns true
         * or false depending on the success of the query.
         * Possible format:
         *      deleteColumn('age');
         */
        static public function deleteColumn(string $column) : bool {
            return Model::runQuery('ALTER TABLE ' . basename(get_called_class()) . ' DROP COLUMN ' . $column . ';');
        }//end deleteColumn
    }//end Model
?>