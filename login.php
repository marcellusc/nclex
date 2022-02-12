
<?php
session_start();
error_reporting(0);

require_once('database.php');
require_once('library.php');
$error = "";
if(isset($_POST['txtusername'])){
	$error = checkUser($_POST['txtusername'],$_POST['txtpassword'],$_POST['OfficeName']);
}//if


require_once('database.php');
$sql = "SELECT DISTINCT(off_name)
		FROM tbl_offices";
$result = dbQuery($sql);





include 'header.php';



if(isset($_POST['registration'])){
header("registration.php");
	
}


?>

<script language="javascript">
<!--
 function memloginvalidate()
{
   if(document.form1.txtusername.value == "")
     {
        alert("Please enter admin UserName.");
        document.form1.txtusername.focus();
        return false;
     }
   if(document.form1.txtpassword.value == "")
     {
        alert("Please enter admin Password.");
        document.form1.txtpassword.focus();
        return false;
     }
   } 

//-->
</script></head>


<body onLoad="document.form1.txtusername.focus();">


<tr style="float: left">
    <td><div align="left">

          <span class="redtext">
              <br>
        </div>

                      <tbody><tr>
                        <form name="form1" id="form" style="font-family:Quicksand, sans-serif;background-color:rgba(44,40,52,0.73);width:320px;padding:40px;"  method="post" onSubmit="return memloginvalidate()">
                          <td><table bgcolor="#FFFFFF" border="0" cellpadding="3" cellspacing="1" width="100%">
                              <tbody>


								<font color="#FF0000" style="font-size:12px;">
								<?php echo $error; ?>
								</font>


                                        <h1 id="head" style="color:rgb(193,166,83);">Sign Up</h1>
                                        <div><img class="rounded img-fluid" id="image" style="width:auto;height:auto;" src="assets/img/logo.png"></div>
                                        <div class="form-group"><input name="txtusername" class="form-control" type="email" id="formum" placeholder="Email"></div>
                                        <div class="form-group"><input  name="txtpassword" class="form-control" type="password" id="formum2" placeholder="Password"></div>
                                        <div class="form-group"><input  name="OfficeName" class="form-control" type="text" id="formum3" placeholder="Country" ></div>
                                        <div class="form-group"></div><button class="btn btn-light" id="butonas" style="width:100%;height:100%;margin-bottom:10px;background-color:rgb(106,176,209);"name="Submit" value="Login" type="submit">Login</button><a id="linkas" style="font-size:12px;margin:auto;margin-left:0;margin-right:0;margin-bottom:0;margin-top:0;padding-left:0;padding-right:0;color:rgb(177,151,70);" href="#">Forgot your e mail or password?</a>

			</select>
								</td>
                              </tr>

                          </tbody>
						  </table>
						  </form>
						  </td>
                        
                      </tr>
                    </tbody></table></td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
              </tbody></table></td>

      
    </tbody></table></td>
  </tr>
</tbody></table>
</td></tr></tbody></table>
<?php include 'footer.php';?>

