using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;


[System.Serializable]
public class RecievedThing
{
    public string status;
    public string message;
    public string token;
}


public class Login : MonoBehaviour
{

    public InputField username, password;
    public Text FeedBackText;

    public LoginToken token;
    public Button LoginBtn, StartBtn;

    void Start()
    {
        FeedBackText.text = "";
    }

    public void LoginButton()
    {
        UpdateFeedbackText("Connecting...", Color.yellow);
        if (!Validiate())
        {
            UpdateFeedbackText("Please fill all the required fields and try again", Color.red);
            return;
        }

        StartCoroutine(LoginCoro());
    }

    bool Validiate()
    {
        return username.text != "" && password.text != "";
    }

    string url = "http://localhost:8000/login";

    IEnumerator LoginCoro()
    {
        LoginBtn.interactable = false;
        username.interactable = false;
        password.interactable = false;

        WWWForm form = new WWWForm();
        form.AddField("email", username.text);
        form.AddField("password", password.text);

        WWW www = new WWW(url, form);

        Debug.Log("Starting");
        yield return www;

        if (!string.IsNullOrEmpty(www.error))
        {
            Debug.Log(www.error);
            UpdateFeedbackText("Please Check Internet Connection", Color.red);
        }
        else
        {
            Debug.Log("Form upload complete!");
            Debug.Log(www.text);

            RecievedThing recData = JsonUtility.FromJson<RecievedThing>(www.text);

            Debug.Log(recData.status);
            Debug.Log(recData.message);
            Debug.Log(recData.token);

            if (recData.status == "Success")
            {
                OnConnectedToHere();
                token.Value = recData.token;
                token.eMail = username.text;
            }
            else
            {
                UpdateFeedbackText(recData.message, Color.red);
            }
        }

        if (LoginBtn.gameObject.activeSelf)
        {
            LoginBtn.interactable = true;
            username.interactable = true;
            password.interactable = true;
        }


    }

    void UpdateFeedbackText(string text, Color clr)
    {
        FeedBackText.text = text;
        FeedBackText.color = clr;
    }

    //private void Update()
    //{
    //    if (Input.GetKeyDown(KeyCode.A))
    //    {
    //        OnConnectedToHere();
    //    }
    //}

    void OnConnectedToHere()
    {
        username.gameObject.SetActive(false);
        password.gameObject.SetActive(false);
        LoginBtn.gameObject.SetActive(false);
        StartBtn.gameObject.SetActive(true);
        UpdateFeedbackText("Connected", Color.green);
    }

    public void OnClickStartButton()
    {
        SceneManager.LoadSceneAsync("MainScene");
    }
}
