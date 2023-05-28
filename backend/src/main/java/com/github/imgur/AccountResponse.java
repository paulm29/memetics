package com.github.imgur;

public class AccountResponse extends AbstractResponse {
    /*
    {
        "account": {
            "url": "Alan",
            "isPro": "true",
            "defaultAlbumPrivacy": "secret",
            "publicImages": "false"
        }
    }*/
    private static class Account {
        private String url;
        private boolean isPro;
        private String defaultAlbumPrivacy;
        private boolean publicImages;
    }

    private Account account;

    public String getUrl() {
        return account.url;
    }

    public boolean isPro() {
        return account.isPro;
    }

    public String getDefaultAlbumPrivacy() {
        return account.defaultAlbumPrivacy;
    }

    public boolean isPublicImages() {
        return account.publicImages;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        sb.append("AccountResponse");
        sb.append("{account=")
                .append(getUrl()).append(' ')
                .append(isPro()).append(' ')
                .append(getDefaultAlbumPrivacy()).append(' ')
                .append(isPublicImages()).append(' ');
        sb.append('}');
        return sb.toString();
    }
}
