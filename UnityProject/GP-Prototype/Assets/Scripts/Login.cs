using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;


public class Login : MonoBehaviour
{

    public InputField username, password;
    public Text FeedBackText;

    void Start()
    {
        FeedBackText.text = "";
    }

    void Update()
    {

    }

    public void LoginButton()
    {
        FeedBackText.text = "";
        if (!Validiate())
        {
            FeedBackText.text = "Please fill all the required fields and try again";
            return;
        }

        StartCoroutine(LoginCoro());
    }

    bool Validiate()
    {
        return username.text != "" || password.text != "";
    }

    string url = "http://localhost:8000/login";

    string ay7aga = "username=\"3amo12\"&password=\"1234556\"";

    IEnumerator LoginCoro()
    {
		WWWForm form= new WWWForm ();
		form.AddField ("username", "3amo12");
		form.AddField ("password", "123456");

		WWW www = new WWW (url, form);

		yield return www;

		if (!string.IsNullOrEmpty(www.error))
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Form upload complete!");
            Debug.Log(www.text);
        }

    }
}
