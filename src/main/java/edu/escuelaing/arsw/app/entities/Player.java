package edu.escuelaing.arsw.app.entities;

import org.springframework.data.annotation.Id;

public class Player {
    @Id
    public String id;
    public String userName;
    public String password;

  public Player() {}

  public Player(String userName, String password) {
    this.userName = userName;
    this.password = password;
  }

    public void setUserName(String userName){
        this.userName = userName;
    }
    public void setPassword(String password){
         this.password = password;
    }
    public String getUserName(){
        return this.userName;
    }
    public String getPassword(){
        return this.password;
    }
    @Override
    public String toString() {
        return String.format(
                "User[id=%s, Username='%s']",
                id, userName);
    }

    public void setId(String id2) {
        this.id = id2;
    }

}
