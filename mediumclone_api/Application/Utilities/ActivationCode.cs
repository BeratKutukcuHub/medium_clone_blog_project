using mediumclone_api.Common.Shared;

namespace mediumclone_api.Application.Utilities
{
    public static class ActivationCode
    {
        public static string ActivationCoder()
        {
            string guid = Guid.NewGuid().ToString();
            string activationCoder = "";
            foreach (char act in guid)
            {
                if (act == '-')
                    continue;
                activationCoder += act;
                if (activationCoder.Length - 1 == 5)
                    return activationCoder;
            }
            throw new Exception();
        }
    }
}