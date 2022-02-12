//DB_CLASS
// SVET
function DB() {
    this.typeDB = 'web';
    this.db_name = 'l2f';
    //console.log( navigator.sqlitePlugin);
     this.db = window.openDatabase(this.db_name, "1.0", this.db_name, 200000);
    try {
          //this.db = window.sqlitePlugin.openDatabase({name: this.db_name+'.db', location: 'default'});
          this.typeDB = 'sql';
           // alert(this.typeDB);
    }catch(e){
        this.typeDB = 'web';
      //  this.db = window.openDatabase(this.db_name, "1.0", this.db_name, 200000);
          //alert(this.typeDB);
    }
  
    

    /*
     * 
     */
    this.insertData = function (obj, render_function_callback) {
        this.db.transaction(function (tx) {
            // console.log("SELECT * FROM answer  WHERE id_question="+idq);
            //INSERT INTO LOGS (id, log) VALUES (1, "foobar")
            var today = new Date();
            tx.executeSql("INSERT INTO DATA (text,flag, created_time,future_time,img)"+
                         " VALUES ('" + obj.text + "','" + obj.flag + "','"+today+"' ,'" + obj.date + "','')", [], function (tx, result) {
                render_function_callback(result.rows);
            }, null)
        });
    }
   
    this.getDataFromSQL = function (sql, render_function_callback,data) {
        console.log(sql);
        this.db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, result) {
                render_function_callback(result.rows,data);
            }, null)
        });
    }

    /*
     * 
     */
    this.getQuestionByPos = function (idtest, pos, render_function_callback) {
        // var result2 = new Array();
        this.db.transaction(function (tx) {
          //  console.log("SELECT * FROM question  WHERE id_test=" + idtest + " LIMIT " + pos + ", 1");
            tx.executeSql("SELECT * FROM question  WHERE id_test=" + idtest + " LIMIT " + pos + ", 1", [], function (tx, result) {
                render_function_callback(result.rows);
            }, null)
        });
    }

    /*
     * 
     */
    this.getQuestionById = function (id, render_function_callback) {
        this.db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM question  WHERE id=" + id + "", [], function (tx, result) {
                render_function_callback(result.rows);
            }, null)
        });
    }
    /*
     * 
     */
    this.getTableByID = function (table, idobj, render_function_callback) {
        // var result2 = new Array();
        this.db.transaction(function (tx) {
         //   console.log("SELECT * " + table + " USER WHERE '" + idobj.name + "'='" + idobj.val + "'" + idobj.cmd);
            tx.executeSql("SELECT * FROM " + table + " WHERE " + idobj.name + "=" + idobj.val, [], function (tx, result) {
                render_function_callback(result.rows);
                /*
                 for(var i = 0; i < result.rows.length; i++) {
                 console.log(result);
                 result2[i] = result.rows.item(i);
                 
                 }
                 */

            }, null)

        }

        );
        //return result2;
    }



    //---------------------------------------------------------
    //ВЫПОЛНЯЕТ SQL ЗАПРОС И ВЫЗЫВАЕТ КОЛБАК ФУНКЦИЮ
    this.SQL = function (sql, render_function_callback) {
        this.db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, result) {
                render_function_callback(result.rows);
            }, null)
        });
    }
    //------------------------------------------------------
    /*
     * 
     */
      this.SQL3 = function (sql,content) {
        this.db.transaction(function populateDB(tx) {
            tx.executeSql(sql,[content]);
        },
                function (err) {
             //       console.log("Error processing SQL: " + err.message);
                },
                function () {
            //        console.log("success!");
                });

    }
    this.insertData2 = function (table, rows, arr, render_function_callback) {
        this.db.transaction(function (tx) {
            var values = '';
            for (var i = 0; i < arr.length - 1; i++) {
                values += ',?';
            }
            tx.executeSql("INSERT INTO " + table + " (" + rows + ") VALUES (?" + values + ")", arr, function (tx, result) {
                render_function_callback(result.rows);
            }, null)
        });
    }


    this.updateData = function (table,where, rowsarr, arrdata, function_callback) {
        this.db.transaction(function (tx) {
            var SET = '';
            for (var i = 0; i < rowsarr.length; i++) {
                SET += rowsarr[i]+'=?';
                if(rowsarr.length - 1 !=i){
                    SET+=',';
                }
            }
           // console.log("UPDATE " + table + " SET " + SET + " WHERE ="+where);
            tx.executeSql("UPDATE " + table + " SET " + SET + " WHERE "+where, arrdata, function (tx, result) {
                function_callback(result.rows);
            }, null)
        });
    }



}//END_CLASS_DB
var db = null;