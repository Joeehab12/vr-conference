using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class A4PaperBooth : MonoBehaviour
{

    private Booth b;

    public void SetBooth(Booth _b)
    {
        b = _b;
    }

    public Booth GetBooth()
    {
        return b;
    }
}
