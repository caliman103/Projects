<?php
    namespace Framework\Traits;

    use Framework\Database\Model;

    trait ModelHelper {
        /*
         * This function will be used internally to run all commands that don't return records. It takes
         * in the query as a parameter and returns true or false depending on the results of the query.
         */
        static protected function runQuery(string $query) : bool {
            $connection = new \mysqli('localhost','root','','user_management_system');
            if($connection->query($query)) {
                return true;
            }
            return false;
        }//end runQuery

        /*
         * This function will be used internally to run select queries. It takes in
         * a select query as a parameter,runs it and adds the records into
         * an array variable. This array is then returned. 
         */
        static protected function runSelectQuery(string $query) : array {
            $connection = new \mysqli('localhost','root','','user_management_system');
            $records = [];
            $results = $connection->query($query);
            if(!empty($results)) {
                while($rec = mysqli_fetch_array($results)) {
                    $records[] = (object)$rec;
                }//end while
            }
            return $records;
        }//end runSelectQuery

        /*
         * This function check to make sure that the conditions have the correct format so that they
         * can be correcly appended to the query.
         */
        static protected function checkConditions(array $conditions) : bool {
            $conditionKeys = ['column', 'operator', 'value', 'follow'];
            foreach($conditions as $key => $condition) { //check each condition
                foreach($conditionKeys as $conditionKey) {//check each key
                    if(!array_key_exists($conditionKey, $condition)) {
                        echo $key . ' => ' . $conditionKey . '<br><br>';
                        return false;
                    }//end if  
                }//end foreach
            }//end foreach
            return true; //if the function gets past both for loops then the format for the conditions are correct 
        }//end check conditions

        /*
         * This functions will add conditions to a query. It takes in the query that must be updated as the
         * first parameter and the conditions that will be added on as the second parameter. The conditions
         * parameter will be an associative array which holds the column name, operator, value, and follow
         * statement. These are appropriately appended to the query and then the query will be returned.
         */
        static protected function addConditions(string $query, array $conditions) : string {
            $query .= ' WHERE ';
            $hasOr = false;
            $prevFollow = '';
            $conditions[sizeof($conditions)-1]['follow'] = ''; //makes sure the last follow is not a comparison operator
            foreach($conditions as $condition) {
                if($condition['follow'] === 'OR') {
                    $hasOr = true;
                }//end if
                if($hasOr && $prevFollow !== 'OR') { //This part is for adding brackets to the query as needed
                    $query .= '('. $condition['column'] .' '. $condition["operator"] . " '" . $condition['value'] . "' ".  $condition['follow'] . ' ';
                } elseif(($prevFollow === 'OR') && ($condition['follow'] !== 'OR')) {
                    $query .= $condition['column'] .' '. $condition["operator"] . " '" . $condition['value'] . "') ".  $condition['follow'] . ' ';
                } else {
                    $query .= $condition['column'] .' '. $condition["operator"] . " '" . $condition['value'] . "' ".  $condition['follow'] . ' ';
                }//end if-else
                $hasOr = false;
                $prevFollow = $condition['follow'];  
            }//end foreach
            return $query;
        }//end addConditions
    }

?>