using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EmailSender : MonoBehaviour
{

    public LoginToken token;

    string url = "http://localhost:8000/email?token=";

    public void SendZipData(Booth booth)
    {
        StartCoroutine(SendMailCoro(booth));
    }


    IEnumerator SendMailCoro(Booth booth)
    {
        Debug.Log("SENDMAIL: send mail from booth " + booth.boothLocation);
        url += token.Value;
        WWWForm form = new WWWForm();
        form.AddField("location", booth.boothLocation);
        form.AddField("path", booth.data.boothZipLink);
        form.AddField("destinationEmail", token.eMail);


        WWW www = new WWW(url, form);

        Debug.Log("Starting");
        yield return www;

        if (!string.IsNullOrEmpty(www.error))
        {
            Debug.Log(www.error);
            //Cant Connect to server .. ask to check internet and click again
        }
        else
        {
            Debug.Log("Form upload complete!");
            Debug.Log(www.text);

            RecievedThing recData = JsonUtility.FromJson<RecievedThing>(www.text);

            Debug.Log(recData.status);
            Debug.Log(recData.message);
            Debug.Log(recData.token);

            if (recData.status == "success")
            {
                Debug.Log("SENDMAIL: Sucessfully sent the mail");
                //Msg to confirm the mail is sent
            }
            else
            {
                //Connected to server bs fe error .. el mafrod mayzhrsh 5ales
                Debug.LogError("EMAIL: SHOULD NOT BE HERE: " + recData.message);
            }
        }
    }
}
