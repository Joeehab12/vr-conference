using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CheckTriggerEnter : MonoBehaviour
{

    public EmailSender AssiociatedMail;

    private void OnTriggerEnter(Collider other)
    {
        var paper = other.gameObject.GetComponent<A4PaperBooth>();
        if (paper)
        {
            Debug.Log(other.gameObject.name);
            AssiociatedMail.SendZipData(paper.GetBooth());
        }
    }
}
