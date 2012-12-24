#!/usr/bin/python
# -*- coding: utf-8 -*- 
from urllib2 import Request, build_opener, HTTPHandler, HTTPCookieProcessor
from urllib import urlencode
from time import time
import base64

__all__ = ['Fetion']

class Fetion(object):
    def __init__(self):
        cookie_processor = HTTPCookieProcessor()
        self.opener = build_opener(cookie_processor,
            HTTPHandler)

    def addFriend(self, mobile):
        '''
        {'tip':}
        error
        {'tip',userinfo{idUser,idFetion,mobileNo,nickname},type}
        '''
        url = '/im5/user/searchFriendByPhone.action?number=%s&t=%d'%(mobile,int(time()*1000))
        result = eval(self.open(url))
        if result['tip'] == '':
            url = '/im5/user/addFriendSubmit.action?t=%d'%(int(time()*1000))
            return eval(self.open(url,{'number':mobile,'type':result['type']}))
        return result

    def alive(self):
        htm = self.open('/im5/box/alllist.action?t=%d'%(int(time()*1000)))
        if htm == '':
            return True
        elif '<!DOCTYPE html>' in htm:
            return False
        else:
            return True

    def logout(self):
        '''
        {"tip":"退出成功"}
        '''
        return self.open('/im5/index/logoutsubmit.action')

    __exit__ = __del__ = logout

    def login(self, mobile, password):
        self.mobile, self.password = mobile, password
        result = {}
        if self.alive():
            return result
        data = {
            'm': self.mobile,
            'pass': self.password,
        }
        result = eval(self.open('/im5/login/loginHtml5.action?t=%d'%(int(time()*1000)),data))
        #{"headurl":"","nickname":"","loginstatus":"400","loginstate":"200","tip":"密码错误,请重新尝试","idUser":"","sessionId":"","checkCodeKey":"false"}
        return result

    def sendByMobile(self, mobile, message, sms=False):
        return self.sendByUid(self.getUid(mobile),message,sms)

    def sendByUid(self, id, message, sms=False):
        url = '/im5/chat/sendNewMsg.action'
        if sms:
            url = '/im5/chat/sendNewShortMsg.action'
        return eval(self.open(url,{'msg': message, 'touserid': id}))

    def getUid(self, mobile):
        '''
        May raise TypeError if the mobile is wrong number
        '''
        url = '/im5/user/searchFriendByPhone.action?number=%s&t=%d'%(mobile,int(time()*1000))
        result = eval(self.open(url))
        return result['userinfo']['idUser']

    def getChatGroups(self):
        url = '/im5/index/groupindex.action?t=%d'%(int(time()*1000))
        return eval(self.open(url))

    def getUserGroups(self):
        url = '/im5/index/loadGroupContactsAjax.action?fromUrl=&t=%d'%(int(time()*1000))
        return eval(self.open(url))

    def getFriends(self,groupId):
        url = '/im5/index/contactlistView.action?fromUrl=&idContactList=%d&t=%d'%(groupId, int(time()*1000))
        return eval(self.open(url))

    def getUserIcon(self,user):
        if user['portraitCrc']!= None and user['portraitCrc']!= "" and user['portraitCrc']!="0":
            id = user['idContact']
            idmod1 = id%100
            idmod2 = str(id)[0:2]
            idUser = base64.standard_b64encode(str(id))
            headcrc = "/images/im/f/%d/%s/%s/60.jpg"%(idmod1,idmod2,idUser)
            return self.open(headcrc)
        else:
            return None


    def open(self, url, data=''):
        request = Request('http://f.10086.cn/%s' % url, data=urlencode(data))
        htm = self.opener.open(request).read()
        return htm

