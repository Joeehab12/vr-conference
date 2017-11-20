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

    string ay7aga = "username=3amo12&password=123456";

    IEnumerator LoginCoro()
    {
        List<IMultipartFormSection> formData = new List<IMultipartFormSection>();
        formData.Add(new MultipartFormDataSection(ay7aga));
        //formData.Add(new MultipartFormFileSection("my file data", "myfile.txt"));

        Debug.Log("STARTING BETA3");

        UnityWebRequest www = UnityWebRequest.Post(url, formData);
        yield return www.SendWebRequest();
        Debug.Log("ENDING BETA3");
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Form upload complete!");
            Debug.Log(www.downloadHandler.text);
        }

    }
}
