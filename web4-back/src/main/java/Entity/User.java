package Entity;

import javax.persistence.*;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @SequenceGenerator(name = "UserId_creator", sequenceName = "new_user_id", allocationSize = 1)
    @GeneratedValue(generator = "UserId_creator")
    private int id;

    @Column(name = "login")
    private String login;

    @Column(name = "password")
    private byte[] password;

    public User(String login, byte[] password) {
        this.login = login;
        this.password = password;
    }

    public User() {

    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public byte[] getPassword() {
        return password;
    }

    public void setPassword(byte[] password) {
        this.password = password;
    }
}
